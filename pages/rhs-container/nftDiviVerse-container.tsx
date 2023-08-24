import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { bigIntFormatter } from "../../lib/util/currency-formatter";
import { getTokenBalance } from "../../lib/smart-contract/Interactions/Token/getTokenBalance";
import { getErc20UserBalance } from "../../lib/smart-contract/Interactions/StableCoin/getErc20UserBalance";
import { STABLE_COIN_CONTRACT_ADDRESS } from "../../lib/constants/env";
import { logToConsole } from "../../lib/util/LogToConsole";
import { getNftHeld } from "../../lib/smart-contract/Interactions/Nft/getNftHeld";
import Image from 'next/image'
import { Button } from "flowbite-react";
import ProgressModal from "../modals/progress-modal";
import SuccessModal from "../modals/success-modal";
import ErrorModal from "../modals/error-modal";
import { redeemNextAvailableNft } from "../../lib/smart-contract/Interactions/Nft/redeemNextAvailableNft";
import { ContractFunctionExecutionError } from "viem";
const convert = require('ethereum-unit-converter')
const BN = require('bn.js');


interface IProps {
    enableTest: boolean;
}

const NftDiviVerseContainer: FC<IProps> = ({ enableTest }) => {
    const { address, isConnected } = useAccount();
    const [tokenHeld, setTokenHeld] = useState(new BN("0"));
    const [nftsHeld, setNftsHeld] = useState(new BN("0"));
    const [stableCoinHeld, setStableCoinHeld] = useState(new BN("0"));
    const [tokenHeldMinimumOk, setTokenHeldMinimumOk] = useState(false);
    const [stableCoinHeldMinimumOk, setStableCoinMinimumOk] = useState(false);
    const [disableBuyButton, setDisableBuyButton] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorModelDetail, setErrorModelDetail] = useState("");
    const minimumPrzTokenToBuyNFT = 500;
    const minimumStableCoinToBuyNFT = 500;

    useEffect(() => {
        if (isConnected) {
            // Populate token held
            logToConsole(`Going to call getTokenBalance...`);
            getTokenBalance().then((data: number) => {
                setTokenHeld(data);
            })
                .catch(error => logToConsole(`Exception: ${error}`));

            // Populate stable coin held
            logToConsole(`Going to call getErc20UserBalance...`);
            getErc20UserBalance(STABLE_COIN_CONTRACT_ADDRESS).then((data: number) => {
                setStableCoinHeld(data);
            })
                .catch(error => logToConsole(`Exception: ${error}`));

            // Populate NFTs held
            logToConsole(`Going to call getNftHeld...`);
            getNftHeld().then((data: number) => {
                setNftsHeld(data);
            })
                .catch(error => logToConsole(`Exception: ${error}`));
            // Populate token held price
            //logToConsole(`Going to call getTokenPriceUSD...`);
            //getTokenPriceUSD("0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 2).then((data: number) => {
            //    setTokenPrice(data);
            //})
            //.catch(error => logToConsole(`Exception: ${error}`));
        }
        else {
            setTokenHeld(0);
            setStableCoinHeld(0);
            setNftsHeld(0);
        }
    }, [isConnected, address, showSuccessModal, showErrorModal]);

    useEffect(() => {
        // Set Token Held Minimum Ok
        let tokenHeldInEther = convert(tokenHeld, "wei", "ether") as number;
        let stableCoinInEther = convert(stableCoinHeld, "wei", "ether") as number;
        console.log(`tokenHeldInEther: ${tokenHeldInEther} - stableCoinInEther: ${stableCoinInEther}`);
        setTokenHeldMinimumOk(tokenHeldInEther >= minimumPrzTokenToBuyNFT);
        setStableCoinMinimumOk(stableCoinInEther >= minimumStableCoinToBuyNFT);
    }, [tokenHeld, stableCoinHeld]);

    function displayMinimumRequirementsSatisfactionIcon(value: boolean) {
        return value ? "🟢" : "❌";
    }

    const buy = () => {
        logToConsole(`buy onClick():`);
        if (isConnected) {
            // Disable buy button
            setDisableBuyButton(true);

            // Show progress modal
            setShowProgressModal(true);

            // Execute promise
            redeemNextAvailableNft(enableTest).then(async (result) => {
                logToConsole(`buy onClick() - redeemNextAvailableNft executed correctly - Result: ${result}`)
                setShowSuccessModal(true);
            }).catch((error) => {
                logToConsole(`Error-----> ${error.toString()} #################################`);
                console.dir(error);
                setShowProgressModal(false);
                if (error instanceof ContractFunctionExecutionError)
                    setErrorModelDetail((error as ContractFunctionExecutionError).details);
                else
                    setErrorModelDetail(error.toString());
                setShowErrorModal(true);
                manageBuyException(error);
            }).finally(() => {
                manageBuyInteractionCompleted();
                setShowProgressModal(false);
            });
        }
    }

    // Manage buy exception
    const manageBuyException = (error: any) => {
        logToConsole(`buy onClick(): An error occurred while executing buy functionality! ${error}`);
    }

    // Manage buy promise interaction finish
    const manageBuyInteractionCompleted = () => {
        // Re-enable button
        setDisableBuyButton(false);
    }

    return (
        <>
            <div className="text-left py-10">
                <div className="box-cont h-fit w-fit px-14 py-8 shadow-md bg-neutral-900 rounded-lg text-white">
                    <div className="mb-3">
                        <ConnectButton />
                    </div>
                    <p><span className="text-[#fbbf24]">Token held:</span> {bigIntFormatter(tokenHeld)} Token</p>
                    <p><span className="text-[#fbbf24]">NFTs held:</span> {nftsHeld.toString()}</p>
                    {/* <p>Bag value at market: {tokenPrice.toString()}</p> */}
                    <div className="flex flex-row">
                        <div className="mr-5">
                            <Image
                                src="/assets/nft.jpg"
                                width={150}
                                height={150}
                                alt="NFT"
                                className="mb-5"
                            />
                            {
                                (stableCoinHeldMinimumOk && tokenHeldMinimumOk) ?
                                    <Button className={`text-white px-10 py-1 focus:outline-none focus:ring-red-300 rounded-lg font-medium text-2xl text-center mr-3 md:mr-0 bg-red-600 hover:bg-red-700 focus:ring-red-800 ease-linear transition-all duration-150`} onClick={() => buy()} id="buyButton" disabled={disableBuyButton}>Buy</Button>
                                    :
                                    <Button className={`text-white px-1 py-1 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg font-medium text-2xl text-center mr-3 md:mr-0 bg-zinc-400 hover:bg-zinc-400 focus:ring-red-800 ease-linear transition-all duration-150`} id="buyButton" disabled={true}>You can&apos;t buy NFT</Button>
                            }
                        </div>
                        <div className="flex flex-col">
                            <p>Wallet availability:</p>
                            <p className="text-[10px] leading-tight">(you need to hold 500$ in BUSD <br />and 500 tokens at least <br />to purchase NFT)</p>
                            <p>{displayMinimumRequirementsSatisfactionIcon(stableCoinHeldMinimumOk)} {bigIntFormatter(stableCoinHeld)} BUSD</p>
                            <p>{displayMinimumRequirementsSatisfactionIcon(tokenHeldMinimumOk)} {bigIntFormatter(tokenHeld)} Token</p>
                        </div>
                    </div>
                </div>
            </div>
            <ProgressModal show={showProgressModal} setCallback={setShowProgressModal} />
            <SuccessModal show={showSuccessModal} setCallback={setShowSuccessModal} address={address || '0x00'} />
            <ErrorModal show={showErrorModal} description={errorModelDetail} setCallback={setShowErrorModal} />
        </>
    );
}

export default NftDiviVerseContainer;
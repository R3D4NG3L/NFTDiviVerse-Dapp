
import { readContract } from '@wagmi/core'
import { nftAbi } from '../../Abi/nftAbi';
import { logToConsole } from '../../../util/LogToConsole';
import { getAccount } from '@wagmi/core'
import { checkWalletConnected } from '../checkWalletConnected';
import { NFT_CONTRACT_ADDRESS } from '../../../constants/env';
import { TOKEN_CONTRACT_ADDRESS } from '../../../constants/env';
import { STABLE_COIN_CONTRACT_ADDRESS } from '../../../constants/env';
import { jsonMainnetVouchers } from './vouchers/mainnetVouchers';
import { jsonTestnetVouchers } from './vouchers/testnetVouchers';
import { getErc20Allowance } from '../StableCoin/getErc20Allowance';
import { setErc20Allowance } from '../StableCoin/setErc20Allowance';
import { writeContractAndWaitForTransaction } from '../Generic/writeContractAndWaitForTransaction';
const BN = require('bn.js');

export const redeemNextAvailableNft = async (isTestMode: boolean) => {
    const { address: useAccountAddress } = getAccount();
    const isConnected = checkWalletConnected();
    if (!isConnected) {
        logToConsole("redeemNextAvailableNft: No wallet connected");
        return 0;
    }

    logToConsole("redeemNextAvailableNft: Start... ");

    const totalSupply = await readContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: nftAbi(),
        functionName: "totalSupply",
        args: []
    });

    logToConsole(`redeemNextAvailableNft - totalSupply: ${new BN(totalSupply).toString()}`);

    let vouchers = (isTestMode === true) ? jsonTestnetVouchers() : jsonMainnetVouchers();
    let voucherToRedeem;
    vouchers.every((voucher) => {
        logToConsole(`redeemNextAvailableNft - vouchers.forEach - voucher ${voucher}`);
        if (voucher.tokenId <= new BN(totalSupply))
            return true; // Continue scanning

        logToConsole(`redeemNextAvailableNft - vouchers.forEach - Gonna redeem current voucher ${voucher.tokenId}`);
        voucherToRedeem = voucher;
        return false;
    });

    // Verify allowances
    const revenuesWallet = (await readContract({ address: NFT_CONTRACT_ADDRESS, abi: nftAbi(), functionName: "revenuesWallet", args: [] })) as `0x${string}`;
    const deadWallet = (await readContract({ address: NFT_CONTRACT_ADDRESS, abi: nftAbi(), functionName: "deadWallet", args: [] })) as `0x${string}`
    // BUSD towards Revenues Wallet
    let busdTowardsRevenueWallet = await getErc20Allowance(STABLE_COIN_CONTRACT_ADDRESS, revenuesWallet);
    // BUSD towards NFT contract address
    let busdTowardsNftContract = await getErc20Allowance(STABLE_COIN_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS);
    // Token towards Dead Wallet
    let tokenAllowanceTowardsDeadWallet = await getErc20Allowance(TOKEN_CONTRACT_ADDRESS, deadWallet);
    // Token towards NFT contract address
    let tokenAllowanceTowardsNftContract = await getErc20Allowance(TOKEN_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS);
    logToConsole(`redeemNextAvailableNft - busdTowardsRevenueWallet: ${busdTowardsRevenueWallet} - busdTowardsNftContract: ${busdTowardsNftContract} - tokenAllowanceTowardsDeadWallet: ${tokenAllowanceTowardsDeadWallet} - tokenAllowanceTowardsNftContract: ${tokenAllowanceTowardsNftContract}`);

    let minStableCoinPrice = new BN(voucherToRedeem?.['minStableCoinPrice']);
    let minTokenPrice = new BN(voucherToRedeem?.['minTokenPrice']);
    if (busdTowardsRevenueWallet < minStableCoinPrice) {
        logToConsole(`redeemNextAvailableNft - busdTowardsRevenueWallet < minStableCoinPrice. Setting allowance...`);
        await setErc20Allowance(STABLE_COIN_CONTRACT_ADDRESS, revenuesWallet, minStableCoinPrice).then(async (result) => {
            logToConsole(`redeemNextAvailableNft - busdTowardsRevenueWallet < minStableCoinPrice. Completed!`);
        });  // Set Allowance
    };  // Set Allowance
    if (busdTowardsNftContract < minStableCoinPrice) {
        logToConsole(`redeemNextAvailableNft - busdTowardsNftContract < minStableCoinPrice. Setting allowance...`);
        await setErc20Allowance(STABLE_COIN_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, minStableCoinPrice).then(async (result) => {
            logToConsole(`redeemNextAvailableNft - busdTowardsNftContract < minStableCoinPrice. Completed!`);
        });  // Set Allowance
    }
    if (tokenAllowanceTowardsDeadWallet < minTokenPrice) {
        logToConsole(`redeemNextAvailableNft - tokenAllowanceTowardsDeadWallet < minTokenPrice. Setting allowance...`);
        await setErc20Allowance(TOKEN_CONTRACT_ADDRESS, deadWallet, minTokenPrice).then(async (result) => {
            logToConsole(`redeemNextAvailableNft - tokenAllowanceTowardsDeadWallet < minTokenPrice. Completed!`);
        });  // Set Allowance
    }
    if (tokenAllowanceTowardsNftContract < minTokenPrice) {
        logToConsole(`redeemNextAvailableNft - tokenAllowanceTowardsNftContract < minTokenPrice. Setting allowance...`);
        await setErc20Allowance(TOKEN_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, minTokenPrice).then(async (result) => {
            logToConsole(`redeemNextAvailableNft - tokenAllowanceTowardsDeadWallet < minTokenPrice. Completed!`);
        });  // Set Allowance
    }

    // Redeem NFT
    let voucherToRedeemTuple = [
        voucherToRedeem?.['tokenId'],
        voucherToRedeem?.['stableCoinAddress'],
        voucherToRedeem?.['minStableCoinPrice'],
        voucherToRedeem?.['tokenAddress'],
        voucherToRedeem?.['minTokenPrice'],
        voucherToRedeem?.['uri'],
        voucherToRedeem?.['signature']
    ];
    await writeContractAndWaitForTransaction("NFT Redeem", NFT_CONTRACT_ADDRESS, nftAbi(), "redeem", [useAccountAddress, voucherToRedeemTuple]);

    return;
}
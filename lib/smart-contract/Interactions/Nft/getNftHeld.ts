
import { readContract } from '@wagmi/core'
import { nftAbi } from '../../Abi/nftAbi';
import { logToConsole } from '../../../util/LogToConsole';
import { getAccount } from '@wagmi/core'
import { checkWalletConnected } from '../checkWalletConnected';
import { NFT_CONTRACT_ADDRESS } from '../../../constants/env';
const BN = require('bn.js');

export const getNftHeld = async () =>
{
    const { address: useAccountAddress } = getAccount();
    const isConnected = checkWalletConnected();
    if (!isConnected)
    {
        logToConsole("getNftHeld: No wallet connected");
        return 0;
    }

    logToConsole("getNftHeld: Start... ");

    const data = await readContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: nftAbi(),
        functionName: "balanceOf",
        args: [useAccountAddress as `0x${string}`]
    });

    logToConsole("getNftHeld: " + data?.toString());

    if (data == null)
        return new BN("0");
    else
        return new BN(data.toString());
}

import { readContract } from '@wagmi/core'
import { stableCoinContractAbi } from '../../Abi/stableCoinContractAbi';
import { logToConsole } from '../../../util/LogToConsole';
import { getAccount } from '@wagmi/core'
import { checkWalletConnected } from '../checkWalletConnected';
const BN = require('bn.js');

export const getErc20UserBalance = async (stableCoinAddress : `0x${string}`) =>
{
    const { address: useAccountAddress } = getAccount();
    const isConnected = checkWalletConnected();
    if (!isConnected)
    {
        logToConsole("getErc20UserBalance: No wallet connected");
        return 0;
    }

    logToConsole("getErc20UserBalance: Start... ");

    const data = await readContract({
        address: stableCoinAddress,
        abi: stableCoinContractAbi(),
        functionName: "balanceOf",
        args: [useAccountAddress as `0x${string}`]
    });

    logToConsole("getErc20UserBalance: " + data?.toString());

    if (data == null)
        return new BN("0");
    else
        return new BN(data.toString());
}
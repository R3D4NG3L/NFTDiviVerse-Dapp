
import { readContract } from '@wagmi/core'
import { stableCoinContractAbi } from '../../Abi/stableCoinContractAbi';
import { logToConsole } from '../../../util/LogToConsole';
import { getAccount } from '@wagmi/core'
import { checkWalletConnected } from '../checkWalletConnected';
const BN = require('bn.js');

export const getErc20Allowance = async (erc20TokenAddress : `0x${string}`, spender : `0x${string}`) =>
{
    const { address: useAccountAddress } = getAccount();
    const isConnected = checkWalletConnected();
    if (!isConnected)
    {
        logToConsole("getErc20Allowance: No wallet connected");
        return 0;
    }

    logToConsole("getErc20Allowance: Start... ");

    const data = await readContract({
        address: erc20TokenAddress,
        abi: stableCoinContractAbi(),
        functionName: "allowance",
        args: [useAccountAddress as `0x${string}`, spender]
    });

    logToConsole("getErc20Allowance: " + data?.toString());

    if (data == null)
        return new BN("0");
    else
        return new BN(data.toString());
}
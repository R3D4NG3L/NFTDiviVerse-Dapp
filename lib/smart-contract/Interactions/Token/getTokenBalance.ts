
import { readContract } from '@wagmi/core'
import { tokenAbi } from '../../Abi/tokenAbi';
import { logToConsole } from '../../../util/LogToConsole';
import { getAccount } from '@wagmi/core'
import { checkWalletConnected } from '../checkWalletConnected';
import { TOKEN_CONTRACT_ADDRESS } from '../../../constants/env';
const BN = require('bn.js');

export const getTokenBalance = async () =>
{
    const { address: useAccountAddress } = getAccount();
    const isConnected = checkWalletConnected();
    if (!isConnected)
    {
        logToConsole("getTokenBalance: No wallet connected");
        return 0;
    }

    logToConsole("getTokenBalance: Start... ");

    const data = await readContract({
        address: TOKEN_CONTRACT_ADDRESS,
        abi: tokenAbi(),
        functionName: "balanceOf",
        args: [useAccountAddress as `0x${string}`]
    });

    logToConsole("getTokenBalance: " + data?.toString());

    if (data == null)
        return new BN("0");
    else
        return new BN(data.toString());
}
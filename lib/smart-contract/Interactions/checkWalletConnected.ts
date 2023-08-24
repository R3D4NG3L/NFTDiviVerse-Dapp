import { getAccount } from '@wagmi/core'
import { logToConsole } from '../../util/LogToConsole';


export const checkWalletConnected = () =>
{
    const { isConnected: useAccountIsConnected  } = getAccount();
    if (!useAccountIsConnected)
    {
        logToConsole("checkWalletConnected: No wallet connected");
        return false;
    }

    return true;
}

import { logToConsole } from '../../../util/LogToConsole';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { checkWalletConnected } from '../checkWalletConnected';
import { CHAIN_ID } from '../../../constants/env';

export const writeContractAndWaitForTransaction = async (name : string, contractAddress : `0x${string}`, contractAbi : readonly {}[], functionName : string, args : unknown[]) =>
{
    logToConsole(name + ": Start");
    let isConnected = checkWalletConnected();
    if (!isConnected)
    {
        logToConsole(name + ": No wallet connected");
        return 0;
    }

    let config  = await prepareWriteContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: functionName,
        args: args,
        chainId: parseInt(CHAIN_ID as string)
    });

    logToConsole(`${name}: prepareWriteContract - configuration done. Address: ${config.request.address} - functionName: ${config.request.functionName} - mode: ${config.mode}`);

    let { hash } = await writeContract(config.request);
    logToConsole(name + " - writeContract - hash: " + hash);

    let transaction = await waitForTransaction({
        chainId: parseInt(CHAIN_ID as string),
        hash: hash,
      })
    logToConsole(name + " - waitForTransaction - hash: " + transaction?.logsBloom);

    return transaction;
}


import { stableCoinContractAbi } from '../../Abi/stableCoinContractAbi';
import { writeContractAndWaitForTransaction } from '../Generic/writeContractAndWaitForTransaction';

export const setErc20Allowance = async (tokenAddress : `0x${string}`, spender : `0x${string}`, amountToApprove : BigInt) =>
{
    return await writeContractAndWaitForTransaction(
        "setErc20UserAllowance",
        tokenAddress,
        stableCoinContractAbi(),
        "approve",
        [spender, amountToApprove]
    );
}

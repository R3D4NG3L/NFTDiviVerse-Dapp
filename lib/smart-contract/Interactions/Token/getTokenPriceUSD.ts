import { readContract } from "@wagmi/core";
import { logToConsole } from "../../../util/LogToConsole";
const convert = require('ethereum-unit-converter')
const BN = require('bn.js');

let pancakeSwapAbi = [
    { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" },
];
let tokenAbi = [
    { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
];

const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" //BNB
const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955" //USDT

async function getAmountsOut(amountToSwap : string, path : `0x${string}`[]) {
    let pancakeSwapContract = "0x10ED43C718714eb63d5aA57B78B54704E256024E" as `0x${string}`;
    logToConsole(`getTokenPriceUSD - getAmountsOut - Executing with amountToSwap: ${amountToSwap} - path[0]: ${path[0]} - path[1]: ${path[1]}`);
    let amountOut;
    try {
        amountOut = await readContract({
            address: pancakeSwapContract,
            abi: pancakeSwapAbi,
            functionName: "getAmountsOut",
            args: [amountToSwap, path]
        }) as any;
        logToConsole(`getTokenPriceUSD - getAmountsOut - (Before Conversion) amountOut: ${amountOut}`);
        amountOut = convert(amountOut[1], 'wei', 'ether');
        logToConsole(`getTokenPriceUSD - getAmountsOut - (After Conversion) amountOut: ${amountOut}`);
    } catch (error) 
    { 
        logToConsole(`getTokenPriceUSD - calcSell - Error: ${error}`);
    }
    return amountOut;
}

async function calcSell(amountToSwap : string, tokenAddres : `0x${string}`) {
    logToConsole(`getTokenPriceUSD - calcSell - Executing with amountToSwap: ${amountToSwap} - tokenAddres: ${tokenAddres}`);

    let tokenDecimals = await readContract({
        address: tokenAddres,
        abi: tokenAbi,
        functionName: "decimals",
        args: []
    }) as number;

    amountToSwap = setDecimals(amountToSwap, tokenDecimals);
    let amountOut = await getAmountsOut(amountToSwap, [tokenAddres, BNBTokenAddress]);

    if (!amountOut) return 0;
    return amountOut;
}
async function calcBNBPrice() {
    let bnbToSell = convert(1, 'ether', 'wei');
    logToConsole(`getTokenPriceUSD - calcBNBPrice - bnbToSell: ${bnbToSell}`);
    let amountOut = await getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress]);

    if (!amountOut) return 0;
    return amountOut;
}
function setDecimals(number : string, decimals : number) {
    logToConsole(`getTokenPriceUSD - setDecimals - number: ${number} - decimals: ${decimals}`);
    let numberAbs = number.split('.')[0]
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while (numberDecimals.length < decimals) {
        numberDecimals += "0";
    }
    let res = numberAbs + numberDecimals;
    logToConsole(`getTokenPriceUSD - setDecimals - res: ${res}`);;
    return numberAbs + numberDecimals;
}

export const getTokenPriceUSD = async (tokenAddress: `0x${string}`, amount: typeof BN) => {
    logToConsole(`getTokenPriceUSD: Start... - tokenA: ${tokenAddress}, amount: ${amount}`);
    let bnbPrice = await calcBNBPrice() // query pancakeswap to get the price of BNB in USDT
    logToConsole(`getTokenPriceUSD: Current BNB price: ${bnbPrice}`);
    // Them amount of tokens to sell. adjust this value based on you need, you can encounter errors with high supply tokens when this value is 1.
    let tokens_to_sell = 1;
    let priceInBnb = await calcSell(amount.toString(), tokenAddress) / tokens_to_sell; // calculate TOKEN price in BNB
    let totalAmountValue = priceInBnb * bnbPrice;
    logToConsole(`getTokenPriceUSD: Price in BNB per Token: ${priceInBnb} - Total amount value ($): ${totalAmountValue}`);
    return totalAmountValue;
}
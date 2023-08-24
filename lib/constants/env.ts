export let TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as `0x${string}`;
export let STABLE_COIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STABLE_COIN_CONTRACT_ADDRESS as `0x${string}`;
export let NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;
export let CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
export const a = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
export const b = process.env.NEXT_PUBLIC_TEST_MODE_SECRET;

export const setTestingMode = (enable: boolean = false): boolean => {
  TOKEN_CONTRACT_ADDRESS = (enable ? process.env.NEXT_PUBLIC_TESTNET_TOKEN_CONTRACT_ADDRESS : process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS) as `0x${string}`;
  STABLE_COIN_CONTRACT_ADDRESS = (enable ? process.env.NEXT_PUBLIC_TESTNET_STABLE_COIN_CONTRACT_ADDRESS : process.env.NEXT_PUBLIC_STABLE_COIN_CONTRACT_ADDRESS) as `0x${string}`;
  NFT_CONTRACT_ADDRESS = (enable ? process.env.NEXT_PUBLIC_TESTNET_NFT_CONTRACT_ADDRESS : process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) as `0x${string}`;
  CHAIN_ID = enable ? process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID : process.env.NEXT_PUBLIC_CHAIN_ID;
  return enable;
}


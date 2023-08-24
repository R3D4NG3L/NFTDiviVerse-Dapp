import { Chain } from 'wagmi';

export const testnet: Chain = {
   id: 97,
   name: "Binance Smart Chain Testnet",
   network: "bsc-testnet",
   nativeCurrency: {
       decimals: 18,
       name: "BNB",
       symbol: "tBNB",
  },
   rpcUrls: {
       default: {
           http:  ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      },
       public: {
           http:  ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      },
  },
   blockExplorers: {
       etherscan: {
           name: "BscScan",
           url: "https://testnet.bscscan.com",
      },
       default: {
           name: "BscScan",
           url: "https://testnet.bscscan.com",
      },
  },
   contracts: {
       multicall3: {
           address: "0xca11bde05977b3631167028862be2a173976ca11",
           blockCreated: 17422483,
      },
  },
   testnet: true
};

export const testnetSepolia: Chain = {
  id: 11_155_111,
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia Ether",
    symbol: "SEP",
  },
  rpcUrls: {
    alchemy: {
      http: ["https://eth-sepolia.g.alchemy.com/v2"],
      webSocket: ["wss://eth-sepolia.g.alchemy.com/v2"],
    },
    infura: {
      http: ["https://sepolia.infura.io/v3"],
      webSocket: ["wss://sepolia.infura.io/ws/v3"],
    },
    default: {
      http: ["https://rpc.sepolia.org"],
    },
    public: {
      http: ["https://rpc.sepolia.org"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6507670,
    },
  },
  testnet: true,
};

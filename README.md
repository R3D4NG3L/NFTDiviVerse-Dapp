![NFT DiviVerse](/docs/img/Banner.jpg)

> Unlocking the Infinite: Where NFTs Shine and Tokens Reflect, Dive into a Crypto Ecosystem Unlike Any Other!

- [🤝 Need help for deployment?](#-need-help-for-deployment)
- [🕵️‍♂️ Are you looking for the smart contracts?](#️️-are-you-looking-for-the-smart-contracts)
- [🖼️ Preview](#️-preview)
- [📜 Features](#-features)
- [How to get started](#how-to-get-started)
  - [⌨️ Run npm install](#️-run-npm-install)
  - [⚙️ Configure .env file](#️-configure-env-file)
    - [GLOBAL/PRODUCTION](#globalproduction)
      - [NEXT\_PUBLIC\_ENVIRONMENT](#next_public_environment)
      - [NEXT\_PUBLIC\_TOKEN\_CONTRACT\_ADDRESS](#next_public_token_contract_address)
      - [NEXT\_PUBLIC\_NFT\_CONTRACT\_ADDRESS](#next_public_nft_contract_address)
      - [NEXT\_PUBLIC\_STABLE\_COIN\_CONTRACT\_ADDRESS](#next_public_stable_coin_contract_address)
      - [NEXT\_PUBLIC\_CHAIN\_ID](#next_public_chain_id)
      - [NEXT\_PUBLIC\_ALCHEMY\_API\_KEY](#next_public_alchemy_api_key)
      - [NEXT\_PUBLIC\_WALLET\_CONNECT\_PROJECT\_ID](#next_public_wallet_connect_project_id)
    - [TESTNET](#testnet)
      - [NEXT\_PUBLIC\_TESTNET\_CHAIN\_ID](#next_public_testnet_chain_id)
      - [NEXT\_PUBLIC\_TESTNET\_TOKEN\_CONTRACT\_ADDRESS](#next_public_testnet_token_contract_address)
      - [NEXT\_PUBLIC\_TESTNET\_STABLE\_COIN\_CONTRACT\_ADDRESS](#next_public_testnet_stable_coin_contract_address)
      - [NEXT\_PUBLIC\_TESTNET\_NFT\_CONTRACT\_ADDRESS](#next_public_testnet_nft_contract_address)
      - [NEXT\_PUBLIC\_TEST\_MODE\_SECRET](#next_public_test_mode_secret)
  - [▶️ Start the dapp](#️-start-the-dapp)
  - [🚧 Create a static build](#-create-a-static-build)

# 🤝 Need help for deployment?
If you **need for deployment and use of this dapp and related smart contract**, you can find my contacts on my GitHub profile page.
___If you contact me on Telegram, write as first message that you have found my contact on GitHub or you will be automatically blocked___.

Pay attention: if questions are simple are free of charge, a complete project follow up will require consultancy fees.

# 🕵️‍♂️ Are you looking for the smart contracts?
[Checkout this other repository!](https://github.com/R3D4NG3L/NFTDiviVerse-Smart-Contracts)

# 🖼️ Preview
![Preview](/docs/img/Preview.jpg)

# 📜 Features
- Built with NextJS + Rainbow Kit
- Display connected wallet token held
- Allow customer to buy premium NFT to partecipate to premium reflections distribution (for further details please refer to the [other repository](https://github.com/R3D4NG3L/NFTDiviVerse-Smart-Contracts))
- ❗Coming soon: 
  - Allow user to see claimable premium rewards
  - Allow user to see total rewards gained so far
  - Allow user to claim premium rewards

# How to get started
## ⌨️ Run npm install
Once downloaded this repository, make sure to have NodeJS installed on your computer and run `npm install` in terminal

## ⚙️ Configure .env file
.env file contains the following configurable parameters:
### GLOBAL/PRODUCTION
#### NEXT_PUBLIC_ENVIRONMENT
Choose between `development` (console logs enabled) and `production` (console logs disabled)
#### NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS
Set mainnet deployed token contract address 
```json
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS="0xD263A25Ad51D836cD1a9bcc0383998c5235b541D"
```
#### NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
Set mainnet deployed nft contract address
```json
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="0x1D0D1f698B06E3B0124E142f6094b714B8A4E0e6"
```
#### NEXT_PUBLIC_STABLE_COIN_CONTRACT_ADDRESS
Set stable coin used to allow customer to purchase NFT on mainnet
```json
NEXT_PUBLIC_STABLE_COIN_CONTRACT_ADDRESS="0x55d398326f99059fF775485246999027B3197955"
```
#### NEXT_PUBLIC_CHAIN_ID
Set mainnet chain id. To see chain id refer to [ChainList](https://chainlist.org/)
```json
NEXT_PUBLIC_CHAIN_ID="56"
```
#### NEXT_PUBLIC_ALCHEMY_API_KEY
Useful only in case of deploy on a network that needs Alchemy to work with (e.g. Ethereum)
For further details please refer to [Alchemy API documentation](https://www.alchemy.com/)

#### NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
Wallet Connect project id, useful to enable TrustWallet Mobile and WalletConnect mobile.
Please refer to [Wallet Connect documentation](https://docs.walletconnect.com/2.0/cloud/relay)

### TESTNET
#### NEXT_PUBLIC_TESTNET_CHAIN_ID
Refer to [NEXT\_PUBLIC\_CHAIN\_ID](#next_public_chain_id) but for testnet

#### NEXT_PUBLIC_TESTNET_TOKEN_CONTRACT_ADDRESS
Refer to [NEXT\_PUBLIC\_TOKEN\_CONTRACT\_ADDRESS](#next_public_token_contract_address) but for testnet

#### NEXT_PUBLIC_TESTNET_STABLE_COIN_CONTRACT_ADDRESS
Refer to [NEXT\_PUBLIC\_STABLE\_COIN\_CONTRACT\_ADDRESS](#next_public_stable_coin_contract_address) but for testnet

#### NEXT_PUBLIC_TESTNET_NFT_CONTRACT_ADDRESS
Refer to [NEXT\_PUBLIC\_NFT\_CONTRACT\_ADDRESS](#next_public_nft_contract_address) but for testnet

#### NEXT_PUBLIC_TEST_MODE_SECRET
Secret key to start the dapp to connect to the testnet.

## ▶️ Start the dapp
To start the dapp run the command `npm run dev` to work on mainnet, otherwise run the command `npm run dev-test` to work on testnet

## 🚧 Create a static build
To create a static build ready to be deployed on a web server via FTP, run the command `npm run build`, the output will be available in "out" folder and ready to be uploaded on FTP server.
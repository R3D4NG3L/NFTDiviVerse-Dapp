import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, walletConnectWallet, trustWallet, ledgerWallet, rabbyWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Menu from './menu/menu';
import Shuttle from "./marketing-components/shuttle";
import { b, setTestingMode } from '../lib/constants/env';
import { testnet } from '../lib/util/testnet';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { useSearchParams } from 'next/navigation'
import '../global.css';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default function MyApp() {
  // Get URL Parameters
  const params = useSearchParams();
  const enableTest = setTestingMode(params.get('t') === b);

  const envProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [enableTest ? testnet : bsc],
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet({ chains, projectId: envProjectId }),
        trustWallet({ chains, projectId: envProjectId }),
        ledgerWallet({ chains, projectId: envProjectId })
      ],
    },
    {
      groupName: 'Others',
      wallets: [
        walletConnectWallet({ chains, projectId: envProjectId }),
        rabbyWallet({ chains }),
        injectedWallet({ chains })
      ],
    },
  ])

  const wagmiConfig = createConfig({
    autoConnect: false,
    connectors: connectors,
    publicClient,
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={darkTheme(
        {
          accentColor: '#E02424',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
        }
      )} modalSize="compact" chains={chains}>
        <Menu />
        <main>
          <Shuttle enableTest={enableTest} />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

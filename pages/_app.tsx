import "@/styles/globals.css"
import "@/styles/components.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"

import { Roboto } from "@next/font/google"
import { WagmiConfig, createClient, chain, configureChains } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { Toaster } from "react-hot-toast"
import { YearnClientProvider } from "@/lib/contexts/Yearn"
import { ALCHEMY_API_KEY } from "@/lib/constants"

const { provider, chains, webSocketProvider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "yearn.today",
  chains,
})

const client = createClient({
  autoConnect: true,
  webSocketProvider,
  provider,
  connectors,
})

const fontRoboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fontRoboto.className}>
      <Toaster />
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <YearnClientProvider>
            <Component {...pageProps} />
          </YearnClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  )
}

import { Yearn } from "@yfi/sdk"
import {
  type PropsWithChildren,
  createContext,
  useMemo,
  useContext,
  useEffect,
} from "react"
import { JsonRpcProvider } from "@ethersproject/providers"
import { ALCHEMY_URL } from "@/lib/constants"
import { useAccount, useProvider, useSigner } from "wagmi"

const CHAIN_ID = 1
export const YearnContext = createContext({
  // MAINNET
  client: {} as Yearn<1>,
})

export const useYearnContext = () => useContext(YearnContext)

export const YearnClientProvider = ({ children }: PropsWithChildren) => {
  const { data: signer } = useSigner()
  const client = useMemo(() => {
    return new Yearn(CHAIN_ID, {
      provider: new JsonRpcProvider(ALCHEMY_URL),
    })
  }, [])

  useEffect(() => {
    if (signer?.provider) {
      console.debug({ signer })
      // set signer provider to allow write-tx
      client.context.setProvider(signer.provider as any)
    }
  }, [signer?.provider])

  return (
    <YearnContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </YearnContext.Provider>
  )
}

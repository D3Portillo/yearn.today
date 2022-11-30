import { Yearn } from "@yfi/sdk"
import {
  type PropsWithChildren,
  createContext,
  useMemo,
  useContext,
} from "react"
import { useProvider } from "wagmi"

const CHAIN_ID = 1
export const YearnContext = createContext({
  // MAINNET
  client: {} as Yearn<1>,
})

export const useYearnContext = () => useContext(YearnContext)

export const YearnClientProvider = ({ children }: PropsWithChildren) => {
  const provider = useProvider()
  const client = useMemo(() => {
    return new Yearn(CHAIN_ID, {
      provider: provider as any,
    })
  }, [])

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

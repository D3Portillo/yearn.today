import { useMemo } from "react"
import { Yearn } from "@yfi/sdk"
import { useAccount, useProvider } from "wagmi"

// mainnet
const CHAIN_ID = 1

export const useYearnClient = () => {
  const provider = useProvider()
  const { address } = useAccount()
  const client = useMemo(() => {
    if (!address) return null
    return new Yearn(CHAIN_ID, {
      provider: provider as any,
    })
  }, [])

  return client
}

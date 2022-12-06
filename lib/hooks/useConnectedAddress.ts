import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

/**
 * NOTE: This solves problem for nextjs hydrate error
 * @see https://github.com/wagmi-dev/wagmi/issues/28
 */
function useConnectedAddress() {
  const { address: wagmiAddress } = useAccount()
  const [address, setAddress] = useState("")

  useEffect(() => {
    setAddress(wagmiAddress || "")
  }, [wagmiAddress])

  return address
}

export default useConnectedAddress

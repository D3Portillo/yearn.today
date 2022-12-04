import { useEffect } from "react"
import { useChainModal } from "@rainbow-me/rainbowkit"
import { useNetwork } from "wagmi"
import { noOp } from "@/lib/helpers"

function NetworkSentinel() {
  const { openChainModal = noOp } = useChainModal()
  const { chain } = useNetwork()

  useEffect(() => {
    if (chain?.unsupported) {
      openChainModal()
    }
  }, [chain?.unsupported])

  /**
   * NOTE: Ikr this can be a hook.
   * But future update might include a banner or a wrapper
   * to render content only when connected to expected chains.
   */
  return null
}

export default NetworkSentinel

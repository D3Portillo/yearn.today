import type { YDaemonVault } from "@/types/shared"
import { SUPPORTED_ASSETS } from "@/lib/constants"

export async function getAllVaults() {
  let vaults: YDaemonVault[] = []

  try {
    vaults = await (
      await fetch("https://ydaemon.yearn.finance/1/vaults/all")
    ).json()

    vaults = vaults
      .filter(
        ({ apy, token, type: vaultType }) =>
          apy.type !== "error" &&
          vaultType === "Standard" &&
          SUPPORTED_ASSETS.includes(token.address.toLowerCase())
      )
      .map((vault) => {
        // search for icon(url) under token.icon else append default url
        return {
          ...vault,
          icon: (vault as any)?.token?.icon || vault.icon,
        }
      })
  } catch (_) {}
  return vaults
}

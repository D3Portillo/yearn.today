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
        (vault) =>
          vault.apy.type !== "error" &&
          SUPPORTED_ASSETS.includes(vault.token.address)
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

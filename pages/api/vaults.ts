import type { YDaemonVault } from "@/types/shared"
import type { NextApiRequest, NextApiResponse } from "next"
import { ADDRESS_DAI, ADDRESS_USDC, ADDRESS_USDT } from "@/lib/constants"

const SUPPORTED_ASSETS = [ADDRESS_USDC, ADDRESS_USDT, ADDRESS_DAI]
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
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
  // Data fresh for 5s. Stale until 120s
  res.setHeader("Cache-Control", "max-age=5, stale-while-revalidate=120")
  res.status(200).json(vaults)
}

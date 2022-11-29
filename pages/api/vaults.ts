// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

export type Vault = {
  address: string
  symbol: string
  name: string
  display_name: string
  icon: string
  tvl: {
    total_assets: number
    price: number
    tvl: number
  }
  apy: {
    type: string
    gross_apr: number
    net_apy: number
  }
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  let vaults: Vault[] = []

  try {
    vaults = await (
      await fetch("https://api.yearn.finance/v1/chains/1/vaults/all")
    ).json()

    vaults = vaults
      .filter((vault) => {
        // Filter for only USDC-in vaults
        return vault.symbol.includes("USDC")
      })
      .map((vault) => {
        // search for icon(url) under token.icon else append default url
        return {
          ...vault,
          icon: (vault as any)?.token?.icon || vault.icon,
        }
      })
  } catch (_) {}
  // Data fresh for 5s. Stale until 60s
  res.setHeader("Cache-Control", "max-age=5, stale-while-revalidate=59")
  res.status(200).json(vaults)
}

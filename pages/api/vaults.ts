import type { NextApiRequest, NextApiResponse } from "next"
import { getAllVaults } from "@/lib/services/vaults"

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const vaults = await getAllVaults()

  // Data fresh for 5s. Stale until 120s
  res.setHeader("Cache-Control", "max-age=5, stale-while-revalidate=120")
  res.status(200).json(vaults)
}

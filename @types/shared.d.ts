import { Vault } from "@yfi/sdk"
import { type PropsWithChildren } from "react"

export type PropsWithChildrenCx<Props = unknown> = PropsWithChildren<Props> & {
  className?: string
}

/** Yearn Vault */
export type YVault = Vault

export type YDaemonVault = {
  address: string
  symbol: string
  name: string
  version: string
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
  token: {
    address: string
  }
}

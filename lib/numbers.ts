import { utils } from "ethers"

const NumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
})

const BalanceNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
})

const CompactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
})

export const formatNumber = (value: any) => NumberFormatter.format(value || 0)

export const formatNumberCompact = (value: any) =>
  CompactNumberFormatter.format(value)

export const formatUnits = (value: any, decimals: string | number) =>
  utils.formatUnits(value || 0, decimals)

/**
 * @param decimals defaults to 6
 * @default
 * decimals 6
 */
export const formatNumberUnits = (value: any, decimals: any = 6) =>
  BalanceNumberFormatter.format(formatUnits(value, decimals) as any)

export const formatUSDC = (value: any) => formatUnits(value, 6)

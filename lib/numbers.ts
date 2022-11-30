import { utils } from "ethers"

const Formatter = new Intl.NumberFormat("en-EN", {
  maximumFractionDigits: 2,
})

const CompactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
})

export const formatNumber = (value: any) => Formatter.format(value)
export const formatNumberCompact = (value: any) =>
  CompactFormatter.format(value)
export const formatUSDC = (value: any) => (value ? value / 1e6 : 0)
export const parseWeiUSDC = (value: any) =>
  value ? utils.parseUnits(value, 6).toString() : "0"

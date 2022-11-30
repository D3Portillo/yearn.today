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
export const formatUSDC = (value: any) => value / 1e6
export const parseWeiUSDC = (value: any) => `${value * 1e6}`

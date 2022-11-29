const Formatter = new Intl.NumberFormat("en-EN", {
  maximumFractionDigits: 2,
})

export const formatNumber = (value: any) => Formatter.format(value)

import { formatCurreny } from "@/lib/currency"
import { classnames } from "@/lib/helpers"

function TooltipEarnings({ earnings = 0 }: { earnings: string | number }) {
  const isNegative = earnings < 0
  const isPositive = earnings > 0
  return (
    <span
      title={`$${earnings} USD`}
      className={classnames(
        isNegative && "text-red-600",
        isPositive && "text-yearn-blue",
        "inline-flex items-center gap-[.15em] cursor-help font-bold"
      )}
    >
      <span>{formatCurreny(earnings)}</span>
      <span
        className={classnames(
          isNegative && "bg-red-500",
          isPositive && "bg-green-500",
          "w-[.25em] h-[.25em] opacity-60 rounded-full animate-ping"
        )}
      />
    </span>
  )
}

export default TooltipEarnings

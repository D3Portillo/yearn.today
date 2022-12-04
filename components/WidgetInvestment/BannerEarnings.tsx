import { formatCurreny } from "@/lib/currency"
import { utils } from "ethers"

function BannerEarnings({
  tokenPrice = 0,
  amount,
  decimals = 6,
}: {
  tokenPrice?: string | number
  amount: number
  decimals?: string | number
}) {
  return (
    <div className="border border-dotted p-2 rounded-xl text-zinc-600">
      <p className="text-sm text-center">
        <span>⚡</span> You can earn{" "}
        <strong className="text-yearn-blue">
          {formatCurreny(
            amount * (utils.formatUnits(tokenPrice, decimals) as any)
          )}
        </strong>
        /year with this investment
      </p>
    </div>
  )
}

export default BannerEarnings

import type { PropsWithChildrenCx } from "@/types/shared"
import type { VaultsUserSummary } from "@yfi/sdk"
import { useEffect, useState } from "react"

import useConnectedAddress from "@/lib/hooks/useConnectedAddress"
import { useYearnClient } from "@/lib/yearn"
import { formatNumber, formatUSDC } from "@/lib/numbers"
import { formatCurreny } from "@/lib/currency"
import { noOp } from "@/lib/helpers"

import TooltipEarnings from "./TooltipEarnings"
import CardContainer from "./layout/CardContainer"

function Summary() {
  const [summary, setSummary] = useState<VaultsUserSummary>({} as any)
  const address = useConnectedAddress()
  const client = useYearnClient()

  useEffect(() => {
    if (address) {
      client.vaults.summaryOf(address).then(setSummary).catch(noOp)
    }
  }, [address])

  return (
    <CardContainer className="mt-12">
      <div className="flex items-center justify-between text-center">
        <Section title="Deposits">
          {formatCurreny(formatUSDC(summary.holdings))}
        </Section>
        <Separator />
        <Section title="Total Earnings">
          <TooltipEarnings earnings={formatUSDC(summary.earnings)} />
        </Section>
        <Separator className="hidden md:block" />
        <Section className="hidden md:block" title="Current APY">
          {formatNumber((summary.grossApy || 0) * 100)}%
        </Section>
      </div>
    </CardContainer>
  )
}

function Section({
  children,
  title,
  className,
}: PropsWithChildrenCx<{
  title: string
}>) {
  return (
    <section className={`${className} flex-grow`}>
      <h3 className="mb-1">{title}</h3>
      <p className="text-2xl font-bold text-yearn-blue">{children}</p>
    </section>
  )
}

const Separator = ({ className }: { className?: string }) => (
  <div className={`${className} w-px bg-black/20 min-h-[4rem]`} />
)

export default Summary

import { useState, type PropsWithChildren } from "react"

import { useVault } from "@/lib/yearn"
import CardContainer from "@/components/layout/CardContainer"
import Withdraw from "./Withdraw"
import Deposit from "./Deposit"

function WidgetInvestment({
  vaultAddress,
  maxWidth = "max-w-sm",
}: {
  vaultAddress: string
  maxWidth?: string
}) {
  const yVault = useVault(vaultAddress)
  const [showWithdraw, setShowWithdraw] = useState(false)

  const toggleShowWithdraw = () => setShowWithdraw((show) => !show)

  const vault = {
    tokenAddress: yVault?.token,
    vaultAddress,
  }

  return (
    <CardContainer className={`w-full ${maxWidth}`}>
      <nav className="w-full flex text-xl">
        <TabButton isActive={!showWithdraw} onClick={toggleShowWithdraw}>
          Deposit
        </TabButton>
        <TabButton isActive={showWithdraw} onClick={toggleShowWithdraw}>
          Withdraw
        </TabButton>
      </nav>
      {showWithdraw ? <Withdraw vault={vault} /> : <Deposit vault={vault} />}
    </CardContainer>
  )
}

function TabButton({
  isActive,
  onClick,
  children,
}: PropsWithChildren<{ isActive: boolean; onClick: any }>) {
  return (
    <button onClick={onClick} className="flex-grow">
      <h3
        className={`px-8 pt-1 pb-4 ${isActive ? "font-bold" : "text-zinc-500"}`}
      >
        {children}
      </h3>
      <div
        className={`w-full h-[2px] ${
          isActive ? "bg-yearn-blue" : "bg-black/5"
        }`}
      />
    </button>
  )
}

export default WidgetInvestment

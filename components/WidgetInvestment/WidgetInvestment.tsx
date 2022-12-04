import type { PropsWithChildren } from "react"

import { useVault } from "@/lib/yearn"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
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
  const withdrawMachine = useOnOffMachine()

  const vault = {
    tokenAddress: yVault?.token!,
    vaultAddress,
  }

  return (
    <CardContainer className={`w-full ${maxWidth}`}>
      <nav className="w-full flex text-xl">
        <TabButton
          isActive={withdrawMachine.isOff}
          onClick={withdrawMachine.turnOff}
        >
          Deposit
        </TabButton>
        <TabButton
          isActive={withdrawMachine.isOn}
          onClick={withdrawMachine.turnOn}
        >
          Withdraw
        </TabButton>
      </nav>
      {withdrawMachine.isOn ? (
        <Withdraw vault={vault} />
      ) : (
        <Deposit vault={vault} />
      )}
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

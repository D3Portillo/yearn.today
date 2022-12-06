import type { PropsWithChildren } from "react"

import { useVault } from "@/lib/yearn"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import CardContainer from "@/components/layout/CardContainer"
import Withdraw from "./Withdraw"
import Deposit from "./Deposit"

function WidgetInvestment({
  vaultAddress,
  maxWidth = "max-w-sm",
  rounded,
}: {
  vaultAddress: string
  maxWidth?: string
  rounded?: string
}) {
  const yVault = useVault(vaultAddress)
  const withdrawMachine = useOnOffMachine()

  return (
    <CardContainer rounded={rounded} className={`w-full ${maxWidth}`}>
      <nav className="w-full flex text-xl mb-2">
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
        <Withdraw yVault={yVault} vaultAddress={vaultAddress} />
      ) : (
        <Deposit yVault={yVault} vaultAddress={vaultAddress} />
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

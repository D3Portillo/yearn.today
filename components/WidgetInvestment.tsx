import CardContainer from "@/components/layout/CardContainer"
import { Fragment, useState, type PropsWithChildren } from "react"
import Button from "./Button"

function WidgetInvestment() {
  const [showWithdraw, setShowWithdraw] = useState(false)
  const toggleShowWithdraw = () => setShowWithdraw((show) => !show)

  return (
    <CardContainer className="w-full max-w-sm">
      <nav className="w-full flex text-xl">
        <TabButton isActive={!showWithdraw} onClick={toggleShowWithdraw}>
          Deposit
        </TabButton>
        <TabButton isActive={showWithdraw} onClick={toggleShowWithdraw}>
          Withdraw
        </TabButton>
      </nav>
      <section className="flex flex-col mt-4 gap-4">
        {showWithdraw ? <Withdraw /> : <Deposit />}
      </section>
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

function Deposit() {
  return (
    <Fragment>
      <input
        placeholder="0.00"
        type="text"
        className="text-xl border rounded p-2 bg-transparent"
      />
      <div className="flex items-center gap-2 text-zinc-600">
        <span className="font-bold">Balance:</span>
        <span>0.00 USDC</span>
      </div>
      <Button fontSize="text-xl">Approve</Button>
      <Button fontSize="text-xl">Confirm</Button>
    </Fragment>
  )
}

function Withdraw() {
  return (
    <Fragment>
      <input
        placeholder="0.00"
        type="text"
        className="text-xl border rounded p-2 bg-transparent"
      />
      <div className="flex items-center gap-2 text-zinc-600">
        <span className="font-bold">Balance:</span>
        <span>0.00 USDC</span>
      </div>
      <Button fontSize="text-xl">Approve</Button>
      <Button fontSize="text-xl">Confirm</Button>
    </Fragment>
  )
}

export default WidgetInvestment

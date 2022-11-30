import { useEffect, useState, type PropsWithChildren } from "react"
import { useRouter } from "next/router"

import { useYearnClient } from "@/lib/yearn"
import CardContainer from "@/components/layout/CardContainer"
import Withdraw from "./Withdraw"
import Deposit from "./Deposit"

function WidgetInvestment() {
  const router = useRouter()
  const client = useYearnClient()
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [tokenAddress, setTokenAddress] = useState("")

  const { id: vaultAddress } = router.query as { id: string }
  const toggleShowWithdraw = () => setShowWithdraw((show) => !show)

  useEffect(() => {
    if (client && vaultAddress) {
      client.vaults.get([vaultAddress]).then(([vault]) => {
        // Fetch for vault token
        setTokenAddress(vault.token)
      })
    }
  }, [client?.ready, vaultAddress])

  const vault = {
    tokenAddress,
    vaultAddress,
  }

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
        {showWithdraw ? <Withdraw vault={vault} /> : <Deposit vault={vault} />}
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

export default WidgetInvestment

import { useEffect, useState } from "react"
import type { Vault as VaultType } from "@/pages/api/vaults"
import { useAccount } from "wagmi"

import ff from "@/lib/services/ff"
import CardContainer from "@/components/layout/CardContainer"
import Vault from "./Vault"

function VaultList() {
  const { address } = useAccount()
  const [list, setList] = useState<VaultType[]>([])

  useEffect(() => {
    ff.get<VaultType[]>(["/vaults"]).then(setList)
  }, [])

  return (
    <CardContainer className="mt-8 min-h-[32rem] pb-12">
      <h2>Stable Vault Opportunities</h2>
      <p>Invest on USDC vaults to earn constant rewards.</p>
      <table className="w-full mt-8">
        <thead>
          <tr className="text-left">
            <th colSpan={2}>Name</th>
            <th className="p-2">Version</th>
            <th className="p-2">TVL</th>
            <th className="p-2">Your investment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 && vaultLoadingItemsList}
          {list.map((vault) => {
            return (
              <Vault
                key={`vault-${vault.symbol}-${vault.address}`}
                holderAddress={address!}
                {...vault}
              />
            )
          })}
        </tbody>
      </table>
    </CardContainer>
  )
}

const vaultLoadingItemsList = [...Array(5)].map((_, i) => (
  <VaultLoadingState key={`empty-state-${i}`} />
))

function VaultLoadingState() {
  return (
    <tr className="text-left">
      <td colSpan={2}>
        <div className="bg-zinc-100 h-12 rounded-lg" />
      </td>
      {[...Array(4)].map((_, i) => {
        return (
          <td key={`loading-cell-${i}`} className="p-2">
            <div className="bg-zinc-100 h-12 rounded-lg animate-pulse" />
          </td>
        )
      })}
    </tr>
  )
}

export default VaultList

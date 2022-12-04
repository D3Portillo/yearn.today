import type { YDaemonVault } from "@/types/shared"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

import ff from "@/lib/services/ff"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import CardContainer from "@/components/layout/CardContainer"
import ModalDeposit from "@/components/ModalDeposit"
import Vault from "./Vault"

function VaultList() {
  const { address } = useAccount()
  const modalMachine = useOnOffMachine()
  const [vaultAddress, setVaultAddress] = useState("")
  const [list, setList] = useState<YDaemonVault[]>([])

  useEffect(() => {
    ff.get<YDaemonVault[]>(["/vaults"]).then(setList)
  }, [])

  function handleOpenModal(vaultAddress: string) {
    setVaultAddress(vaultAddress)
    modalMachine.turnOn()
  }

  return (
    <CardContainer className="mt-8 min-h-[24rem] pb-12">
      <ModalDeposit
        onClose={modalMachine.turnOff}
        show={modalMachine.isOn}
        vaultAddress={vaultAddress}
      />
      <h2>Stable Vault Opportunities</h2>
      <p>Invest on yearn-stable vaults and earn constant rewards.</p>
      <div className="w-full overflow-auto mt-8">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th colSpan={2}>Name</th>
              <th className="p-2">Version</th>
              <th className="p-2">TVL</th>
              <th className="p-2">Your Deposits</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && vaultLoadingItemsList}
            {list.map((vault) => {
              return (
                <Vault
                  key={`vault-${vault.symbol}-${vault.address}`}
                  onOpenModal={() => handleOpenModal(vault.address)}
                  holderAddress={address!}
                  {...vault}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </CardContainer>
  )
}

const vaultLoadingItemsList = [...Array(3)].map((_, i) => (
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

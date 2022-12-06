import type { YDaemonVault } from "@/types/shared"
import { useState } from "react"

import useConnectedAddress from "@/lib/hooks/useConnectedAddress"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import CardContainer from "@/components/layout/CardContainer"
import ModalDeposit from "@/components/ModalDeposit"
import Vault from "./Vault"

function VaultList({ vaults }: { vaults: YDaemonVault[] }) {
  const address = useConnectedAddress()
  const modalMachine = useOnOffMachine()
  const [vaultAddress, setVaultAddress] = useState("")

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
              <th className="min-w-[6rem]" colSpan={2}>
                Name
              </th>
              <th className="px-4 py-2 min-w-[12rem]">TVL</th>
              <th className="px-4 py-2 whitespace-nowrap min-w-[10rem]">
                Your Deposits
              </th>
              <th className="px-4 py-2">Version</th>
            </tr>
          </thead>
          <tbody>
            {vaults.length === 0 && vaultLoadingItemsList}
            {vaults.map((vault) => {
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
    <tr>
      {[...Array(3)].map((_, i) => {
        return (
          <td
            colSpan={i % 2 == 0 ? 2 : undefined}
            key={`loading-cell-${i}`}
            className="p-2"
          >
            <div className="bg-zinc-100 h-12 rounded-lg animate-pulse" />
          </td>
        )
      })}
    </tr>
  )
}

export default VaultList

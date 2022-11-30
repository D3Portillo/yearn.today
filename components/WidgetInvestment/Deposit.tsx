import { Fragment } from "react"
import { useAccount } from "wagmi"

import { useAllowance, useBalance, useVault, useYearnClient } from "@/lib/yearn"
import Button from "@/components/Button"

function Deposit({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { tokenAddress, vaultAddress } = vault

  const client = useYearnClient()
  const yVault = useVault(vaultAddress)
  const { address } = useAccount()
  const depositAllowance = useAllowance(
    "deposit",
    address,
    vaultAddress,
    tokenAddress
  )
  const balance = useBalance(address, tokenAddress)

  console.debug({ yVault, depositAllowance, balance })

  return (
    <Fragment>
      <input
        placeholder="0.00"
        type="text"
        className="text-xl border rounded p-2 bg-transparent"
      />
      <div className="flex items-center gap-2 text-zinc-600">
        <span className="font-bold">Balance:</span>
        <span>{balance} USDC</span>
      </div>
      <Button fontSize="text-xl">Approve</Button>
      <Button fontSize="text-xl">Confirm</Button>
    </Fragment>
  )
}

export default Deposit

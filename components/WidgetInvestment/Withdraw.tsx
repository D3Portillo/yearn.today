import { useAccount } from "wagmi"
import toast from "react-hot-toast"

import { withPreventDefault } from "@/lib/inputs"
import { useAllowance, useBalance, useVault, useYearnClient } from "@/lib/yearn"
import Button from "@/components/Button"

function Withdraw({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { tokenAddress, vaultAddress } = vault

  const client = useYearnClient()
  const yVault = useVault(vaultAddress)
  const { address } = useAccount()
  const balance = useBalance(address, tokenAddress)

  function handleConfirm() {}

  return (
    <form
      className="flex flex-col mt-4 gap-4"
      onSubmit={withPreventDefault(handleConfirm)}
    >
      <input
        placeholder="0.00"
        type="number"
        step="0.1"
        min={0}
        required
        name="amount"
        className="text-xl border rounded p-2 bg-transparent"
      />
      <div className="flex items-center gap-2 text-zinc-600">
        <span className="font-bold">Balance:</span>
        <span>{balance} USDC</span>
      </div>
      <Button type="submit" fontSize="text-xl">
        Withdraw
      </Button>
    </form>
  )
}

export default Withdraw

import { useState } from "react"
import { useAccount } from "wagmi"
import toast from "react-hot-toast"

import { withPreventDefault } from "@/lib/inputs"
import {
  useBalance,
  useRawTokenBalance,
  useVault,
  useYearnClient,
} from "@/lib/yearn"
import Button from "@/components/Button"
import { formatUSDC, parseWeiUSDC } from "@/lib/numbers"

function Withdraw({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { tokenAddress, vaultAddress } = vault

  const [amount, setAmount] = useState("")
  const client = useYearnClient()
  const yVault = useVault(vaultAddress)
  const { address } = useAccount()
  const vaultTokenBalance = useRawTokenBalance(address, vaultAddress)
  const usdcVaultTokenBalance = useBalance(address, vaultAddress)

  function handleConfirm() {
    if (!address) return toast.error("You must connect to continue")
    if ((amount as any) > vaultTokenBalance.balance) {
      return toast.error("You don't own that much assets")
    }
    let toaster = toast.loading("Working...")
    client.vaults
      .withdraw(vaultAddress, tokenAddress, parseWeiUSDC(amount), address)
      .then(async (tx) => {
        await tx?.wait()
        toast.success("Yaaay!")
      })
      .catch((error) => {
        toast.error("Oops something went wrong")
        console.error({ error })
      })
      .finally(() => {
        toast.dismiss(toaster)
      })
  }

  return (
    <form
      className="flex flex-col mt-4 gap-4"
      onSubmit={withPreventDefault(handleConfirm)}
    >
      <input
        placeholder="0.00"
        type="number"
        value={amount}
        onChange={({ target }) => setAmount(target.value)}
        step="0.1"
        min={0}
        required
        name="amount"
        className="text-xl border rounded p-2 bg-transparent"
      />
      <table className="text-zinc-600">
        <tbody>
          <tr>
            <td className="font-bold">Price</td>
            <td>${formatUSDC(vaultTokenBalance.priceUsdc)}</td>
          </tr>
          <tr>
            <td className="font-bold">Investment</td>
            <td>${usdcVaultTokenBalance}</td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">Balance</span> /{" "}
              {yVault.symbol || "Token"}:
            </td>
            <td>{formatUSDC(vaultTokenBalance.balance)}</td>
          </tr>
        </tbody>
      </table>
      <Button type="submit" fontSize="text-xl">
        Withdraw
      </Button>
    </form>
  )
}

export default Withdraw

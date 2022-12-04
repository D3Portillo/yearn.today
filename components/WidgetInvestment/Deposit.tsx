import { useState } from "react"
import { useAccount } from "wagmi"
import toast from "react-hot-toast"

import { withPreventDefault } from "@/lib/inputs"
import { useAllowance, useBalance, useVault, useYearnClient } from "@/lib/yearn"
import { parseWeiUSDC } from "@/lib/numbers"
import Button from "@/components/Button"
import BannerEarnings from "./BannerEarnings"

function Deposit({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { vaultAddress, tokenAddress } = vault

  const [amount, setAmount] = useState("")
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
  const maxDeposit = yVault.metadata?.depositLimit
  const nAmount = amount as any as number

  function handleApprove() {
    if (!address) return toast.error("You must connect to continue")
    else {
      let toaster = toast.loading("Working...")
      client.vaults
        .approveDeposit(address, vaultAddress, tokenAddress, maxDeposit)
        .then(async (tx) => {
          await tx?.wait()
          toast.success("Tx Confirmed")
        })
        .catch((error) => {
          toast.error("Oops something went wrong")
          console.error({ error })
        })
        .finally(() => {
          toast.dismiss(toaster)
        })
    }
  }

  function handleConfirm() {
    if (!address) return toast.error("You must connect to continue")
    if (nAmount > balance) {
      return toast.error("You don't own that much assets")
    }
    let toaster = toast.loading("Working...")
    client.vaults
      .deposit(vaultAddress, tokenAddress, parseWeiUSDC(amount), address)
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

  const hideApproveButton = depositAllowance.amount
    ? (depositAllowance.amount as any) >= yVault.metadata?.depositLimit
    : true

  function handleSubmit() {
    if (hideApproveButton) {
      handleConfirm()
    } else handleApprove()
  }

  return (
    <form
      className="flex flex-col mt-4 gap-4"
      onSubmit={withPreventDefault(handleSubmit)}
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
      <div className="flex items-center gap-2 text-zinc-600">
        <span className="font-bold">Balance:</span>
        <span>
          {balance} {yVault.metadata?.displayName || "USDC"}
        </span>
      </div>
      <Button isDisabled={hideApproveButton} fontSize="text-xl">
        Approve
      </Button>
      <Button isDisabled={!hideApproveButton} fontSize="text-xl">
        Confirm
      </Button>
      {nAmount > 0 && (
        <BannerEarnings
          amount={nAmount}
          tokenPrice={yVault.metadata?.pricePerShare}
          decimals={yVault.decimals}
        />
      )}
    </form>
  )
}

export default Deposit

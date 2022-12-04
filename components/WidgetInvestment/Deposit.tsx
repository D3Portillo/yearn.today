import { useState } from "react"
import { useAccount } from "wagmi"
import toast from "react-hot-toast"
import { utils } from "ethers"

import { withPreventDefault } from "@/lib/inputs"
import {
  useAllowance,
  useRawTokenBalance,
  useVault,
  useYearnClient,
} from "@/lib/yearn"
import { formatNumberUnits } from "@/lib/numbers"
import Button from "@/components/Button"
import BannerEarnings from "./BannerEarnings"
import InputNumber from "./InputNumber"
import Table, { Row } from "./Table"

function Deposit({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { vaultAddress, tokenAddress } = vault

  const [amount, setAmount] = useState(0)
  const client = useYearnClient()
  const yVault = useVault(vaultAddress)
  const { address } = useAccount()
  const depositAllowance = useAllowance(
    "deposit",
    address,
    vaultAddress,
    tokenAddress
  )

  const { balance } = useRawTokenBalance(address, tokenAddress)
  const maxDeposit = yVault.metadata?.depositLimit

  const formattedBalance = formatNumberUnits(balance, yVault.decimals)
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
    if (amount > balance) {
      return toast.error("You don't own that much assets")
    }
    let toaster = toast.loading("Working...")
    client.vaults
      .deposit(
        vaultAddress,
        tokenAddress,
        utils.parseUnits(amount as any, yVault.decimals) as any,
        address
      )
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
    ? depositAllowance?.amount >= (yVault.metadata?.depositLimit || 0)
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
      <InputNumber<number>
        maxValue={formattedBalance as any}
        value={amount}
        onChange={setAmount}
      />
      <Table>
        <Row title="Balance">
          ${formattedBalance} {yVault.metadata?.displayName || "USDC"}
        </Row>
      </Table>
      <Button isDisabled={hideApproveButton} fontSize="text-xl">
        Approve
      </Button>
      <Button isDisabled={!hideApproveButton} fontSize="text-xl">
        Confirm
      </Button>
      {amount > 0 && (
        <BannerEarnings
          amount={amount}
          tokenPrice={yVault.metadata?.pricePerShare}
          decimals={yVault.decimals}
        />
      )}
    </form>
  )
}

export default Deposit

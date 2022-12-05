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
import useToastTransaction from "@/lib/hooks/useToastTransaction"
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
  const { toastTransaction } = useToastTransaction()
  const { balance } = useRawTokenBalance(address, tokenAddress)
  const maxDeposit = yVault.metadata?.depositLimit

  const formattedBalance = formatNumberUnits(balance, yVault.decimals)

  async function handleApprove() {
    if (!address) return toast.error("You must connect to continue")
    await toastTransaction(
      client.vaults.approveDeposit(
        address,
        vaultAddress,
        tokenAddress,
        maxDeposit
      )
    )
    depositAllowance.refetch()
  }

  async function handleConfirm() {
    if (!address) return toast.error("You must connect to continue")
    if (amount == 0) {
      return toast.error("Balance is zero")
    }
    if (amount > balance) {
      return toast.error("You don't own that much assets")
    }
    await toastTransaction(
      client.vaults.deposit(
        vaultAddress,
        tokenAddress,
        utils.parseUnits(amount as any, yVault.decimals) as any,
        address
      )
    )
    // reset input
    setAmount(0)
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
        <Row title="Deposit Balance">
          {formattedBalance} {yVault.metadata?.displayName || "USDC"}
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

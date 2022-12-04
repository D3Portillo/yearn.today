import { useState } from "react"
import { useAccount } from "wagmi"
import toast from "react-hot-toast"
import { utils } from "ethers"

import { withPreventDefault } from "@/lib/inputs"
import { formatCurreny } from "@/lib/currency"
import { useRawTokenBalance, useVault, useYearnClient } from "@/lib/yearn"
import { formatNumberUnits, formatUnits, formatUSDC } from "@/lib/numbers"

import Button from "@/components/Button"
import InputNumber from "./InputNumber"
import Table, { Row } from "./Table"

function Withdraw({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { tokenAddress, vaultAddress } = vault

  const [amount, setAmount] = useState("0")
  const client = useYearnClient()
  const yVault = useVault(vaultAddress)
  const { address } = useAccount()
  const {
    priceUsdc: vaultTokenPrice,
    balanceUsdc,
    balance,
  } = useRawTokenBalance(address, vaultAddress)
  const rawHolderBalance = formatUnits(balance, yVault.decimals!)

  function handleConfirm() {
    if (!address) return toast.error("You must connect to continue")
    if ((amount as any) > balance) {
      return toast.error("You don't own that much assets")
    }
    let toaster = toast.loading("Working...")
    client.vaults
      .withdraw(
        vaultAddress,
        tokenAddress,
        utils.parseUnits(amount, yVault.decimals) as any,
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

  return (
    <form
      className="flex flex-col mt-4 gap-4"
      onSubmit={withPreventDefault(handleConfirm)}
    >
      <InputNumber
        maxValue={rawHolderBalance}
        value={amount}
        onChange={setAmount}
      />
      <Table>
        <Row title={`Balance/ ${yVault.symbol || "Token"}`}>
          {formatNumberUnits(balance, yVault.decimals)}
        </Row>
        <Row title="Investment">{formatCurreny(formatUSDC(balanceUsdc))}</Row>
        <Row title="Price">${formatUSDC(vaultTokenPrice)}</Row>
      </Table>
      <Button type="submit" fontSize="text-xl">
        Withdraw
      </Button>
    </form>
  )
}
export default Withdraw

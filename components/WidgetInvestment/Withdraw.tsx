import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import toast from "react-hot-toast"
import { utils } from "ethers"

import { withPreventDefault } from "@/lib/inputs"
import { formatCurreny } from "@/lib/currency"
import { useRawTokenBalance, useVault, useYearnClient } from "@/lib/yearn"
import { formatNumberUnits, formatUnits, formatUSDC } from "@/lib/numbers"
import useToastTransaction from "@/lib/hooks/useToastTransaction"

import Button from "@/components/Button"
import InputNumber from "./InputNumber"
import Table, { Row } from "./Table"

function Withdraw({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const { tokenAddress, vaultAddress } = vault
  const [holderEarnings, setHolderEarnings] = useState("0")
  const [amount, setAmount] = useState("0")
  const client = useYearnClient()
  const yVault = useVault(vaultAddress)
  const { address } = useAccount()
  const { priceUsdc: vaultTokenPrice, balance } = useRawTokenBalance(
    address,
    vaultAddress
  )
  const rawHolderBalance = formatUnits(balance, yVault.decimals!)
  const { toastTransaction } = useToastTransaction()

  useEffect(() => {
    if (address) {
      client.earnings.accountAssetsData(address).then((earnings) => {
        const poolEarning = earnings.earningsAssetData.find(
          (asset) => asset.assetAddress === vaultAddress
        )
        setHolderEarnings(poolEarning?.earned || "0")
      })
    }
    // Also update when balance changes
  }, [address, balance])

  function handleConfirm() {
    if (!address) return toast.error("You must connect to continue")
    if ((amount as any) > balance) {
      return toast.error("You don't own that much assets")
    }
    toastTransaction(
      client.vaults.withdraw(
        vaultAddress,
        tokenAddress,
        utils.parseUnits(amount, yVault.decimals) as any,
        address
      )
    )
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
        <Row title="Earned">{formatCurreny(formatUSDC(holderEarnings))}</Row>
        <Row title="Price">${formatUSDC(vaultTokenPrice)}</Row>
      </Table>
      <Button type="submit" fontSize="text-xl">
        Withdraw
      </Button>
    </form>
  )
}

export default Withdraw

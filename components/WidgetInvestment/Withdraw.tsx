import { Fragment, useEffect, useState } from "react"
import { useAccount } from "wagmi"

import { useYearnClient } from "@/lib/yearn"
import Button from "@/components/Button"

function Withdraw({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const client = useYearnClient()
  const [balance, setBalance] = useState("0")
  const { address: holderAddress } = useAccount()

  const { tokenAddress } = vault
  useEffect(() => {
    if (client && holderAddress && tokenAddress) {
      client.services.helper
        .tokenBalances(holderAddress, [tokenAddress])
        .then(([balance]) => {
          if (balance) {
            // Fetch for connected address balance for vault token
            setBalance(balance.balanceUsdc)
          }
        })
    }
  }, [client?.ready, holderAddress, tokenAddress])

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

export default Withdraw

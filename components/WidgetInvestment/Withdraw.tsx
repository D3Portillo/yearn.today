import { Fragment, useEffect, useState } from "react"
import { useAccount } from "wagmi"

import { formatUSDC } from "@/lib/numbers"
import { useYearnClient } from "@/lib/yearn"
import Button from "@/components/Button"

function Withdraw({
  vault,
}: {
  vault: { tokenAddress: string; vaultAddress: string }
}) {
  const client = useYearnClient()
  const [balance, setBalance] = useState(0)
  const { address: holderAddress } = useAccount()

  const { vaultAddress } = vault
  useEffect(() => {
    if (client && holderAddress && vaultAddress) {
      client.services.helper
        .tokenBalances(holderAddress, [vaultAddress])
        .then(([balance]) => {
          if (balance) {
            console.log({ balance })
            // Fetch for connected address balance for vault utilty token
            setBalance(formatUSDC(balance.balanceUsdc))
          }
        })
    }
  }, [client?.ready, holderAddress, vaultAddress])

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

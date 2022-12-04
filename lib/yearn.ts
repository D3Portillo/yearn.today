import type { TokenAllowance, TokenBalance, Vault } from "@yfi/sdk"
import { useEffect, useState } from "react"
import { useYearnContext } from "./contexts/Yearn"
import { noOp } from "./helpers"
import { formatUSDC } from "./numbers"

export const useYearnClient = () => {
  const yearnContext = useYearnContext()
  return yearnContext.client
}

export const useVault = (vaultAddress: string) => {
  const client = useYearnClient()
  const [vault, setVault] = useState({} as Partial<Vault>)

  useEffect(() => {
    if (vaultAddress) {
      client.vaults
        .get([vaultAddress])
        .then(([vault]) => {
          if (vault) setVault(vault)
        })
        .catch(noOp)
    }
  }, [vaultAddress])

  return vault
}

export const useAllowance = (
  allowanceType: "deposit" | "withdraw",
  holderAddress: string | undefined,
  vaultAddress: string,
  tokenAddress: string
) => {
  const client = useYearnClient()
  const [allowance, setAllowance] = useState({} as Partial<TokenAllowance>)

  useEffect(() => {
    if (holderAddress && vaultAddress && tokenAddress) {
      client.vaults[
        allowanceType == "deposit"
          ? "getDepositAllowance"
          : "getWithdrawAllowance"
        // asuming withdraw
      ](holderAddress, vaultAddress, tokenAddress)
        .then(setAllowance)
        .catch(noOp)
    }
  }, [holderAddress, vaultAddress, tokenAddress])

  return allowance
}

export const useRawTokenBalance = (
  address: string | undefined,
  tokenAddress?: string
) => {
  const client = useYearnClient()
  const [balance, setBalance] = useState(
    {} as Pick<TokenBalance, "address" | "balanceUsdc" | "priceUsdc"> & {
      balance: number
    }
  )

  useEffect(() => {
    if (address && tokenAddress) {
      client.services.helper
        .tokenBalances(address, [tokenAddress])
        .then(([balance]) => {
          if (balance) {
            // Fetch for connected address balance for vault token
            setBalance(balance as any)
          }
        })
    }
  }, [address, tokenAddress])

  return balance
}

/**
 * Get balance for a token holder in USDC
 * @param address tokenHolder address
 * @param tokenAddress asset address
 */
export const useBalanceUSDC = (
  address: string | undefined,
  tokenAddress?: string
) => {
  const [balance, setBalance] = useState("0")

  const tokenBalance = useRawTokenBalance(address, tokenAddress)
  useEffect(() => {
    if (tokenBalance.address) {
      setBalance(formatUSDC(tokenBalance.balanceUsdc))
    }
  }, [tokenBalance.address])

  return balance
}

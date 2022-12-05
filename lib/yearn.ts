import { useBalance as useWagmiBalance } from "wagmi"
import type { TokenAllowance, TokenBalance, Vault } from "@yfi/sdk"
import { useEffect, useState } from "react"
import { useYearnContext } from "./contexts/Yearn"
import { formatNumber, formatUSDC } from "./numbers"
import { noOp } from "./helpers"

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
  const [count, setCount] = useState(0)
  const refetch = () => setCount((n) => n + 1)

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
  }, [holderAddress, vaultAddress, tokenAddress, count])

  return {
    refetch,
    ...allowance,
  }
}

export const useRawTokenBalance = (
  address: string | undefined,
  tokenAddress?: string
) => {
  const client = useYearnClient()
  const [vaultBalance, setVaultBalance] = useState(
    {} as Pick<TokenBalance, "address" | "balanceUsdc" | "priceUsdc"> & {
      balance: number
      symbol: string
    }
  )
  const { data } = useWagmiBalance({
    address: address as any,
    token: tokenAddress as any,
    watch: true,
  })

  useEffect(() => {
    if (address && tokenAddress) {
      client.services.helper
        .tokenBalances(address, [tokenAddress])
        .then(([balance]) => {
          if (balance) {
            // Fetch for connected address balance for vault token
            setVaultBalance(balance as any)
          }
        })
    }
    // Refetch when wagmi balance updates
  }, [address, tokenAddress, data?.formatted])

  return {
    ...vaultBalance,
    balance: data?.value.toString() || 0,
    symbol: data?.symbol,
  }
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

export const useVaultAPY = (vault: Partial<Vault>) => {
  const { metadata } = vault
  return {
    ...metadata?.apy,
    formatted: formatNumber(
      ((metadata?.apy?.net_apy as any) || 0) * 100
    ) as string,
  }
}

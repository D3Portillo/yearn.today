import { useBalance as useWagmiBalance } from "wagmi"
import type { TokenAllowance, Vault } from "@yfi/sdk"
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
          setVault(vault || {})
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
  const [tokenPriceUSD, setTokenPriceUSD] = useState<number>(0)
  const { data } = useWagmiBalance({
    address: address as any,
    token: tokenAddress as any,
    watch: true,
  })

  useEffect(() => {
    if (tokenAddress && address) {
      client.services.helper
        .tokenPrices([tokenAddress])
        .then(([token]) => {
          setTokenPriceUSD(formatUSDC(token?.priceUsdc || 0) as any)
        })
        .catch(noOp)
    } else {
      setTokenPriceUSD(0)
    }
    // change when connected address change, token or wagmi.balance updates
  }, [address, tokenAddress, data?.formatted])

  const balance = (data?.value.toString() || 0) as string | number
  const formattedBalance = (data?.formatted || 0) as number
  return {
    balance,
    formattedBalance,
    tokenPriceUSD,
    balanceUSD: formattedBalance * tokenPriceUSD,
    symbol: data?.symbol,
  }
}

/**
 * Get balance for a token holder in USD
 * @param address tokenHolder address
 * @param tokenAddress asset address
 */
export const useBalanceUSD = (
  address: string | undefined,
  tokenAddress?: string
) => {
  const tokenBalance = useRawTokenBalance(address, tokenAddress)
  return tokenBalance.balanceUSD
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

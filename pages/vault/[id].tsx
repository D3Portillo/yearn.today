import Link from "next/link"
import Image from "next/image"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"

import { formatCurreny } from "@/lib/currency"
import { formatUSDC } from "@/lib/numbers"
import { useBalanceUSDC, useVault, useVaultAPY } from "@/lib/yearn"

import CardContainer from "@/components/layout/CardContainer"
import MainLayout from "@/components/layout/MainLayout"
import WidgetInvestment from "@/components/WidgetInvestment"
import ChartEarningsOverTime from "@/components/ChartEarningsOverTime"
import Strategies from "@/components/Strategies"

import asset_usdc from "@/assets/usdc.webp"

export default function VaultPage() {
  const { id } = useRouter().query as { id: string }
  const vault = useVault(id)
  const { formatted: vaultAPY } = useVaultAPY(vault)
  const { address } = useAccount()
  const holderBalance = useBalanceUSDC(address, vault.token)

  return (
    <MainLayout
      title={`Vaults / ${vault.symbol || id || "yVault"} v${
        vault.version || "0.0"
      }`}
    >
      <CardContainer className="flex flex-col md:flex-row flex-grow gap-12 mt-8">
        <section className="flex flex-col">
          <h2>
            <Link href="/" className="text-zinc-500">
              Vaults {"/"}
            </Link>{" "}
            <span>{vault.name}</span>
          </h2>
          <section className="flex gap-4 mt-4 items-start">
            <div className="p-4 bg-white border border-zinc-100 rounded-xl">
              <figure className="w-16 h-16">
                <Image
                  className="flex text-4xl items-center justify-center"
                  alt="💰"
                  placeholder={vault.metadata?.displayIcon ? "empty" : "blur"}
                  src={vault.metadata?.displayIcon || asset_usdc}
                  width={120}
                  height={120}
                />
              </figure>
            </div>
            <table className="whitespace-nowrap">
              <tbody>
                <tr>
                  <td>APY</td>
                  <td className="pl-4 font-bold text-yearn-blue">
                    {vaultAPY}%
                  </td>
                </tr>
                <tr>
                  <td>Investment</td>
                  <td className="pl-4">{formatCurreny(holderBalance)}</td>
                </tr>
                <tr>
                  <td>Deploy Version</td>
                  <td className="pl-4">v{vault.version}</td>
                </tr>
                <tr>
                  <td>Total Assets</td>
                  <td className="pl-4">
                    {formatCurreny(
                      formatUSDC(vault.underlyingTokenBalance?.amountUsdc)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="flex-grow" />
          <Link
            target="_blank"
            className="mt-12 text-sm hidden md:inline-flex items-center"
            href={`https://etherscan.io/address/${id}`}
          >
            <span>Etherscan</span>
            <FiArrowUpRight />
          </Link>
        </section>
        <Strategies strategies={vault.metadata?.strategies} />
      </CardContainer>
      <main className="flex flex-col md:flex-row gap-8 mt-8 items-start">
        <WidgetInvestment maxWidth="md:max-w-sm" vaultAddress={id} />
        <CardContainer className="w-full">
          <h2 className="m-0">Earnings Over Time</h2>
          <ChartEarningsOverTime
            historicEarnings={vault.metadata?.historicEarnings || []}
          />
        </CardContainer>
      </main>
    </MainLayout>
  )
}

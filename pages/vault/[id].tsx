import { type Vault as YearnVaultType } from "@yfi/sdk"
import Link from "next/link"
import Image from "next/image"
import { useAccount } from "wagmi"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"

import { formatCurreny } from "@/lib/currency"
import { formatNumber, formatUSDC } from "@/lib/numbers"
import useAsyncState from "@/lib/hooks/useAsyncState"
import { useVault, useYearnClient } from "@/lib/yearn"

import CardContainer from "@/components/layout/CardContainer"
import MainLayout from "@/components/layout/MainLayout"
import WidgetInvestment from "@/components/WidgetInvestment"
import ChartEarningsOverTime from "@/components/ChartEarningsOverTime"
import Strategies from "@/components/Strategies"

export default function VaultPage() {
  const { address } = useAccount()
  const router = useRouter()
  const client = useYearnClient()
  const [vault, asyncSetVault] = useAsyncState({
    name: "",
    amountUsdc: 0,
    holderBalance: 0,
    apy: "0",
    icon: "",
    metadata: {} as YearnVaultType["metadata"],
    version: "0",
  })

  const { id } = router.query as { id: string }
  const yVault = useVault(id)

  useEffect(() => {
    if (yVault.address) {
      asyncSetVault({
        ...yVault,
        name: yVault.name,
        amountUsdc: formatUSDC(yVault.underlyingTokenBalance.amountUsdc),
        apy: formatNumber((yVault.metadata.apy?.net_apy || 0) * 100),
        icon: yVault.metadata.displayIcon,
      })
    }
  }, [yVault.address])

  useEffect(() => {
    if (address && id) {
      client.vaults.positionsOf(address, [id]).then(([position]) => {
        if (position) {
          asyncSetVault({
            holderBalance: formatUSDC(
              position.underlyingTokenBalance.amountUsdc
            ),
          })
        }
      })
    }
  }, [address, id])

  return (
    <MainLayout
      title={`Vaults / ${yVault.symbol || id || "yVault"} v${
        yVault.version || "0.0"
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
                  src={vault.icon}
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
                    {formatNumber(vault.apy)}%
                  </td>
                </tr>
                <tr>
                  <td>Investment</td>
                  <td className="pl-4">{formatCurreny(vault.holderBalance)}</td>
                </tr>
                <tr>
                  <td>Deploy Version</td>
                  <td className="pl-4">v{vault.version}</td>
                </tr>
                <tr>
                  <td>Total Assets</td>
                  <td className="pl-4">{formatCurreny(vault.amountUsdc)}</td>
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
        <Strategies strategies={vault.metadata.strategies} />
      </CardContainer>
      <main className="flex flex-col md:flex-row gap-8 mt-8 items-start">
        <WidgetInvestment maxWidth="md:max-w-sm" vaultAddress={id} />
        <CardContainer className="w-full">
          <h2 className="m-0">Earnings Over Time</h2>
          <ChartEarningsOverTime
            historicEarnings={vault.metadata.historicEarnings || []}
          />
        </CardContainer>
      </main>
    </MainLayout>
  )
}

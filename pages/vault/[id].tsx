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
    <MainLayout>
      <CardContainer className="flex flex-grow gap-12 mt-8">
        <section className="flex flex-col">
          <h2>
            <Link href="/" className="text-zinc-500">
              Vaults {"/"}
            </Link>{" "}
            <span>{vault.name}</span>
          </h2>
          <section className="flex gap-4 mt-4 items-start">
            <div className="p-4 bg-white rounded-xl">
              <figure className="w-12 h-12">
                <Image
                  className="flex items-center justify-center"
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
                  <td>Total Assets</td>
                  <td className="pl-4">{formatCurreny(vault.amountUsdc)}</td>
                </tr>
                <tr>
                  <td>Your investment</td>
                  <td className="pl-4">{formatCurreny(vault.holderBalance)}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="flex-grow" />
          <Link
            target="_blank"
            className="mt-12 text-sm inline-flex items-center"
            href={`https://etherscan.io/address/${id}`}
          >
            <span>Etherscan</span>
            <FiArrowUpRight />
          </Link>
        </section>
        <Strategies strategies={vault.metadata.strategies} />
      </CardContainer>
      <main className="flex gap-8 mt-8 items-start">
        <WidgetInvestment vaultAddress={id} />
        <CardContainer className="flex-grow">
          <h2 className="m-0">Earnings Over Time</h2>
          <ChartEarningsOverTime
            historicEarnings={vault.metadata.historicEarnings || []}
          />
        </CardContainer>
      </main>
    </MainLayout>
  )
}

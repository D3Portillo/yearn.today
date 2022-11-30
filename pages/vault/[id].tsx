import { type Vault as YearnVaultType } from "@yfi/sdk"
import Link from "next/link"
import Image from "next/image"
import { marked } from "marked"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"

import { formatCurreny } from "@/lib/currency"
import { formatNumber } from "@/lib/numbers"
import useAsyncState from "@/lib/hooks/useAsyncState"
import { useYearnClient } from "@/lib/yearn"
import CardContainer from "@/components/layout/CardContainer"
import MainLayout from "@/components/layout/MainLayout"
import WidgetInvestment from "@/components/WidgetInvestment"
import ChartEarningsOverTime from "@/components/ChartEarningsOverTime"

export default function VaultPage() {
  const router = useRouter()
  const client = useYearnClient()
  const [vault, asyncSetVault] = useAsyncState({
    name: "",
    amountUsdc: 0,
    apy: "0",
    icon: "",
    metadata: {} as YearnVaultType["metadata"],
  })

  const { id } = router.query as { id: string }

  useEffect(() => {
    if (client && id) {
      client.vaults.get([id]).then(([vault]) => {
        console.debug({ vault })
        asyncSetVault({
          ...vault,
          name: vault.name,
          amountUsdc: (vault.underlyingTokenBalance.amountUsdc as any) / 1e6,
          apy: formatNumber((vault.metadata.apy?.net_apy || 0) * 100),
          icon: vault.metadata.displayIcon,
        })
      })
    }
  }, [client?.ready, id])

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
                  <td className="pl-4">{formatCurreny(vault.amountUsdc)}</td>
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
        <WidgetInvestment />
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

function Strategies({
  strategies,
}: Pick<YearnVaultType["metadata"], "strategies">) {
  return (
    <div className="flex-grow">
      <h2>Deposit Strategies</h2>
      <div className="flex gap-4 mt-4">
        {strategies?.strategiesMetadata.map((strategy) => {
          return (
            <details
              key={`strategy-${strategy.address}`}
              className="group w-full max-w-lg"
            >
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[rgba(0,0,0,0.02)] p-4">
                <h3 className="font-medium text-gray-900">{strategy.name}</h3>
                <svg
                  className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <section
                data-type="md-container"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(strategy.description),
                }}
                className="mt-2 px-4 leading-relaxed text-gray-700"
              />
            </details>
          )
        })}
      </div>
    </div>
  )
}

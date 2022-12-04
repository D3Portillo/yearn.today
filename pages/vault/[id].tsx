import Link from "next/link"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"

import { formatCurreny } from "@/lib/currency"
import { formatUSDC } from "@/lib/numbers"
import { useBalanceUSDC, useVault, useVaultAPY } from "@/lib/yearn"

import Table, { Row } from "@/components/WidgetInvestment/Table"
import AssetImage from "@/components/AssetImage"
import CardContainer from "@/components/layout/CardContainer"
import MainLayout from "@/components/layout/MainLayout"
import WidgetInvestment from "@/components/WidgetInvestment"
import ChartEarningsOverTime from "@/components/ChartEarningsOverTime"
import Strategies from "@/components/Strategies"

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
        <section className="flex flex-col items-start">
          <h2>
            <Link href="/" className="text-zinc-500">
              Vaults {"/"}
            </Link>{" "}
            <span>{vault.name}</span>
          </h2>
          <section className="flex flex-col xl:flex-row gap-4 mt-4 items-start justify-start">
            <AssetImage src={vault.metadata?.displayIcon} />
            <Table>
              <Row title="APY">
                <strong className="text-yearn-blue">{vaultAPY}%</strong>
              </Row>
              <Row title="Deposits">{formatCurreny(holderBalance)}</Row>
              <Row title="Total Assets">
                {formatCurreny(
                  formatUSDC(vault.underlyingTokenBalance?.amountUsdc)
                )}
              </Row>
            </Table>
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
      <section className="flex flex-col md:flex-row gap-8 mt-8 items-start">
        <WidgetInvestment maxWidth="md:max-w-sm" vaultAddress={id} />
        <CardContainer className="w-full">
          <h2 className="m-0">Earnings Over Time</h2>
          <ChartEarningsOverTime
            historicEarnings={vault.metadata?.historicEarnings || []}
          />
        </CardContainer>
      </section>
    </MainLayout>
  )
}

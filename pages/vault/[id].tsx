import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"

import { formatCurreny } from "@/lib/currency"
import { formatNumber } from "@/lib/numbers"
import useAsyncState from "@/lib/hooks/useAsyncState"
import { useYearnClient } from "@/lib/yearn"
import CardContainer from "@/components/layout/CardContainer"
import MainLayout from "@/components/layout/MainLayout"
import Button from "@/components/Button"
import Image from "next/image"

export default function VaultPage() {
  const router = useRouter()
  const client = useYearnClient()
  const [vault, asyncSetVault] = useAsyncState({
    name: "",
    amountUsdc: 0,
    apy: "0",
    icon: "",
  })

  const { id } = router.query as { id: string }

  useEffect(() => {
    if (client && id) {
      client.vaults.get([id]).then(([vault]) => {
        console.log({ vault })
        asyncSetVault({
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
      <CardContainer className="mt-8">
        <div className="flex gap-8 items-center justify-between">
          <h2 className="m-0">
            <Link href="/" className="text-zinc-500">
              Vaults {"/"}
            </Link>{" "}
            <span>{vault.name}</span>
          </h2>
          <Link
            target="_blank"
            className="text-zinc-600 text-sm flex items-center"
            href={`https://etherscan.io/address/${id}`}
          >
            <span>Etherscan</span>
            <FiArrowUpRight />
          </Link>
        </div>
        <section className="flex gap-4 mt-4">
          <div className="p-4 border rounded-xl">
            <div className="w-16 h-16">
              <Image
                alt="Vault logo"
                src={vault.icon}
                width={120}
                height={120}
              />
            </div>
          </div>
          <table>
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
      </CardContainer>
      <main className="mt-8 w-full max-w-md">
        <CardContainer>
          <nav className="w-full flex text-xl">
            <button className="flex-grow">
              <h3 className="px-8 pt-1 pb-4 font-bold">Deposit</h3>
              <div className="w-full h-[2px] bg-yearn-blue" />
            </button>
            <button className="flex-grow">
              <h3 className="px-8 pt-1 pb-4 text-zinc-500">Withdraw</h3>
              <div className="w-full h-[2px] bg-black/5" />
            </button>
          </nav>
          <section className="flex flex-col mt-4 gap-4">
            <input
              placeholder="0.00"
              type="text"
              className="text-xl border rounded p-2 bg-transparent"
            />
            <div className="flex items-center gap-2 text-zinc-600">
              <span className="font-bold">Balance:</span>
              <span>0.00 USDC</span>
            </div>
            <Button fontSize="text-xl">Approve</Button>
            <Button fontSize="text-xl">Confirm</Button>
          </section>
        </CardContainer>
      </main>
    </MainLayout>
  )
}

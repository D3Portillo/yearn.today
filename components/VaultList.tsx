import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { utils } from "ethers"
import { useAccount } from "wagmi"
import { FaChevronRight } from "react-icons/fa"
import type { Vault } from "@/pages/api/vaults"

import ff from "@/lib/services/ff"
import { useYearnClient } from "@/lib/yearn"
import { formatCurreny } from "@/lib/currency"
import CardContainer from "@/components/layout/CardContainer"
import { useRouter } from "next/router"

function VaultList() {
  const { address } = useAccount()
  const [list, setList] = useState<Vault[]>([])

  useEffect(() => {
    ff.get<Vault[]>(["/vaults"]).then(setList)
  }, [])

  return (
    <CardContainer className="mt-8 min-h-[32rem] pb-12">
      <h2>Stable Opportunities</h2>
      <p>Invest on USDC vaults to earn constant rewards.</p>
      <table className="w-full mt-8">
        <thead>
          <tr className="text-left">
            <th colSpan={2}>Vault</th>
            <th className="p-2">TVL</th>
            <th className="p-2">Your investment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 && vaultLoadingItemsList}
          {list.map((vault) => {
            return (
              <Vault
                key={`vault-${vault.symbol}`}
                holderAddress={address!}
                {...vault}
              />
            )
          })}
        </tbody>
      </table>
    </CardContainer>
  )
}

const vaultLoadingItemsList = [...Array(5)].map((_, i) => (
  <VaultLoadingState key={`empty-state-${i}`} />
))

function VaultLoadingState() {
  return (
    <tr className="text-left">
      <th colSpan={2}>
        <div className="bg-zinc-100 h-12 rounded-lg" />
      </th>
      <th className="p-2">
        <div className="bg-zinc-100 h-12 rounded-lg animate-pulse" />
      </th>
      <th className="p-2">
        <div className="bg-zinc-100 h-12 rounded-lg animate-pulse delay-75" />
      </th>
    </tr>
  )
}

function Vault({
  display_name,
  tvl,
  icon,
  address,
  holderAddress,
}: Vault & {
  holderAddress: string
}) {
  const router = useRouter()
  const [state, setState] = useState({ balance: 0 })
  const asyncSetState = (newState: Partial<typeof state>) =>
    setState((prev) => ({ ...prev, ...newState }))

  const yearn = useYearnClient()
  useEffect(() => {
    if (yearn && holderAddress) {
      yearn.vaults
        .positionsOf(holderAddress, [address])
        .then(([position]) => {
          asyncSetState({
            balance:
              (utils.formatEther(position?.balance || 0) as any) * tvl.price,
          })
        })
        .catch((error) => {
          console.error({ error })
        })
    }
  }, [holderAddress, yearn?.ready])

  function handleRowClick() {
    router.push({
      pathname: "vault/[id]",
      query: {
        id: 42,
      },
    })
  }

  return (
    <tr
      onClick={handleRowClick}
      className="border-t hover:bg-[rgba(0,0,0,0.022)] cursor-pointer border-zinc-100"
    >
      <td className="p-2 w-12">
        <Image alt="" width={42} height={42} src={icon} />
      </td>
      <td className="px-2 py-4">{display_name}</td>
      <td className="px-2 py-4">{formatCurreny(tvl.tvl)} USD</td>
      <td className="px-2 py-4">
        {holderAddress ? `${formatCurreny(state.balance)} USD` : "-"}
      </td>
      <td>
        <div className="flex justify-end items-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center"
          >
            <button className="bg-black py-2 text-lg px-6 rounded-full text-white">
              Deposit
            </button>
            <Link
              href="/vault/1"
              className="p-4 ml-2 hover:bg-zinc-100 group rounded-full"
            >
              <FaChevronRight className="text-xl group-hover:translate-x-px" />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default VaultList

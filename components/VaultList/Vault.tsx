import type { Vault as VaultType } from "@/pages/api/vaults"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { utils } from "ethers"
import { FaChevronRight } from "react-icons/fa"

import { useYearnClient } from "@/lib/yearn"
import { formatCurreny } from "@/lib/currency"
import { useRouter } from "next/router"
import useAsyncState from "@/lib/hooks/useAsyncState"

function Vault({
  name,
  tvl,
  icon,
  address,
  holderAddress,
}: VaultType & {
  holderAddress: string
}) {
  const router = useRouter()
  const [vault, asyncSetVault] = useAsyncState({ balance: 0 })

  const yearn = useYearnClient()
  useEffect(() => {
    if (yearn && holderAddress) {
      yearn.vaults.positionsOf(holderAddress, [address]).then(([position]) => {
        asyncSetVault({
          balance:
            (utils.formatEther(position?.balance || 0) as any) * tvl.price,
        })
      })
    }
  }, [holderAddress, yearn?.ready])

  function handleRowClick() {
    router.push({
      pathname: "vault/[id]",
      query: {
        id: address,
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
      <td className="px-2 py-4">{name}</td>
      <td className="px-2 py-4">{formatCurreny(tvl.tvl)} USD</td>
      <td className="px-2 py-4">
        {holderAddress ? `${formatCurreny(vault.balance)} USD` : "-"}
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
            <Link href={`/vault/${address}`} className="p-4 ml-2 group">
              <FaChevronRight className="text-xl group-hover:translate-x-px" />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Vault

import type { YDaemonVault } from "@/types/shared"
import Image from "next/image"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa"

import { useBalanceUSD } from "@/lib/yearn"
import { formatCurreny } from "@/lib/currency"
import { useRouter } from "next/router"

function Vault({
  name,
  tvl,
  icon,
  address,
  holderAddress,
  onOpenModal,
  version,
  display_name,
}: YDaemonVault & {
  holderAddress: string
  onOpenModal(): void
}) {
  const router = useRouter()
  const holderInvestment = useBalanceUSD(holderAddress, address)

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
      <td className="px-2 w-12 min-w-[3rem]">
        <Image alt="" width={42} height={42} src={icon} />
      </td>
      <td className="p-4 whitespace-nowrap">
        <span className="hidden md:inline">{name}</span>
        <span className="md:hidden">{display_name}</span>
      </td>
      <td className="p-4 whitespace-nowrap">{formatCurreny(tvl.tvl)} USD</td>
      <td data-title="deposits" className="px-4 py-4 whitespace-nowrap">
        {holderAddress ? `${formatCurreny(holderInvestment)} USD` : "-"}
      </td>
      <td className="p-4">{version}</td>
      <td className="px-4">
        <div className="flex justify-end items-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center"
          >
            <button
              onClick={onOpenModal}
              className="bg-black py-2 text-lg px-6 rounded-full text-white"
            >
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

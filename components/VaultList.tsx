import Image from "next/image"
import Link from "next/link"

import { FaChevronRight } from "react-icons/fa"
import CardContainer from "@/components/layout/CardContainer"

function VaultList() {
  return (
    <CardContainer className="mt-8">
      <h2>Stable Opportunities</h2>
      <p>Invest on USDC vaults to earn constant rewards.</p>
      <table className="w-full mt-8">
        <thead>
          <tr className="text-left">
            <th colSpan={2}>Vault</th>
            <th className="p-2">TVL</th>
            <th className="p-2">Your deposit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Vault />
          <Vault />
          <Vault />
          <Vault />
          <Vault />
        </tbody>
      </table>
    </CardContainer>
  )
}

function Vault() {
  return (
    <tr className="border-t border-zinc-100">
      <td className="p-2 w-12">
        <Image
          alt=""
          width={42}
          height={42}
          src="https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/1/0xdf55670e27bE5cDE7228dD0A6849181891c9ebA1/logo-128.png"
        />
      </td>
      <td className="px-2 py-4">USDC/AAVE</td>
      <td className="px-2 py-4">$3233K USD</td>
      <td className="px-2 py-4">$32 USD</td>
      <td>
        <div className="flex justify-end items-center">
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
      </td>
    </tr>
  )
}

export default VaultList

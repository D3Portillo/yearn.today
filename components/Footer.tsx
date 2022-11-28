import Image from "next/image"
import Link from "next/link"

import { TbBrandGithub } from "react-icons/tb"
import asset_logo from "@/assets/logo.svg"
import Section from "./layout/Section"

function Footer() {
  return (
    <Section aria-label="Site Footer" className="mt-32">
      <section>
        <Image height={32} src={asset_logo} alt="yearn.today logo" />
        <p className="text-xs max-w-sm mt-2">
          yearn.today is an independent tool for the yearn.finance ecosystem.
          <br />
          The app just consumes yearn smart contracts and sdk{"'"}s to provide
          an enhnaced overview to token holders.
        </p>
      </section>
      <section className="flex items-center justify-between py-4 mt-8 border-t">
        <span>2022 ― Nullius in verba</span>
        <Link target="_blank" href="https://github.com/D3Portillo/yearn.today">
          <TbBrandGithub className="text-2xl" />
        </Link>
      </section>
    </Section>
  )
}

export default Footer

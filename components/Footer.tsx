import Image from "next/image"
import { FaGitAlt, FaTwitter } from "react-icons/fa"

import ExternalLink from "@/components/ExternalLink"
import asset_logo from "@/assets/logo.svg"
import Section from "./layout/Section"

function Footer() {
  return (
    <Section aria-label="Site Footer" className="mt-32">
      <section>
        <Image height={32} src={asset_logo} alt="yearn.today logo" />
        <p className="text-xs max-w-sm mt-2">
          This is an independent tool for the{" "}
          <ExternalLink decorate href="/">
            yearn.finance
          </ExternalLink>{" "}
          ecosystem.
          <br />
          This app just consumes yearn smart contracts in the YearnSdk, and
          filter for standard/stable vaults to token holders.
        </p>
      </section>
      <section className="flex gap-1 items-center justify-between py-4 mt-8 border-t">
        <span>2022 ― Nullius in verba</span>
        <span className="flex-grow" />
        <ExternalLink href="https://github.com/D3Portillo/yearn.today">
          <FaGitAlt className="text-[1.5rem]" />
        </ExternalLink>
        <ExternalLink href="https://twitter.com/YearnToday">
          <FaTwitter className="text-[1.33rem]" />
        </ExternalLink>
      </section>
    </Section>
  )
}

export default Footer

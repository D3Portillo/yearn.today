import { Fragment } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"

import { LoadingState } from "@/components/Navigation"
import Section from "@/components/layout/Section"
import Footer from "@/components/Footer"
import VaultList from "@/components/VaultList"
const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: () => <LoadingState />,
})

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>YieldEarn Today</title>
        <meta
          name="description"
          content="💸 Your easy peasy stop to invest on yarn.finance stable vaults."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Section>
        <Navigation />
        <VaultList />
      </Section>
      <Footer />
    </Fragment>
  )
}

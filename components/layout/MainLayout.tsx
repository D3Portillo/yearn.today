import { Fragment, useEffect, type PropsWithChildren } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import dynamic from "next/dynamic"

import { LoadingState } from "@/components/Navigation"
import Section from "@/components/layout/Section"
import Footer from "@/components/Footer"

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: () => <LoadingState />,
})

function MainLayout({ children }: PropsWithChildren) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/")
    // Prefetch homepage whenever layout is used
  }, [])

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
        {children}
      </Section>
      <Footer />
    </Fragment>
  )
}

export default MainLayout

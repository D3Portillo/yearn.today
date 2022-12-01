import { Fragment, useEffect, type PropsWithChildren } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

import { LoadingState } from "@/components/Navigation"
import Section from "@/components/layout/Section"
import Footer from "@/components/Footer"
import SeoTags from "@/components/SeoTags"

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: () => <LoadingState />,
})

function MainLayout({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/")
    // Prefetch homepage whenever layout is used
  }, [])

  return (
    <Fragment>
      <SeoTags title={title} />
      <Section>
        <Navigation />
        {children}
      </Section>
      <Footer />
    </Fragment>
  )
}

export default MainLayout

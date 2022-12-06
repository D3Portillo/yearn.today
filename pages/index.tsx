import type { YDaemonVault } from "@/types/shared"
import type { GetServerSideProps } from "next"
import { getAllVaults } from "@/lib/services/vaults"

import VaultList from "@/components/VaultList"
import MainLayout from "@/components/layout/MainLayout"

export default function Home({ vaults }: { vaults: YDaemonVault[] }) {
  return (
    <MainLayout>
      <VaultList vaults={vaults} />
    </MainLayout>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  // @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  const vaults = await getAllVaults()
  return { props: { vaults }, revalidate: 60 }
}

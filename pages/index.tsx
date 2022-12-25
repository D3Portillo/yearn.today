import type { YDaemonVault } from "@/types/shared"
import type { GetServerSideProps } from "next"
import { useEffect, useState } from "react"

import { getAllVaults } from "@/lib/services/vaults"
import VaultList from "@/components/VaultList"
import MainLayout from "@/components/layout/MainLayout"
import Summary from "@/components/Summary"

export default function Home({ vaults: _vaults }: { vaults: YDaemonVault[] }) {
  const [vaults, setVaults] = useState(_vaults)

  useEffect(() => {
    // If cached vaults failed for any unknown resason and empty
    // Fetch for vaults while rendering the LoadingState
    if (_vaults.length <= 0) getAllVaults().then(setVaults)
  }, [])

  return (
    <MainLayout>
      <Summary />
      <VaultList vaults={vaults} />
    </MainLayout>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  // @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  const vaults = await getAllVaults()
  return { props: { vaults }, revalidate: 60 }
}

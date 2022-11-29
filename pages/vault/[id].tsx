import Link from "next/link"
import CardContainer from "@/components/layout/CardContainer"
import MainLayout from "@/components/layout/MainLayout"

export default function VaultPage() {
  return (
    <MainLayout>
      <CardContainer className="mt-8">
        <h2>
          <Link href="/" className="text-zinc-500">
            Vaults {"/"}
          </Link>{" "}
          <span>Curve cvxCRV</span>
        </h2>
      </CardContainer>
    </MainLayout>
  )
}

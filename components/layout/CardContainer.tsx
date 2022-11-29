import type { PropsWithChildrenCx } from "@/types/shared"

function CardContainer({ children, className }: PropsWithChildrenCx) {
  return (
    <section
      className={`p-6 border border-zinc-100 bg-zinc-50 rounded-xl ${className}`}
    >
      {children}
    </section>
  )
}

export default CardContainer

import type { PropsWithChildrenCx } from "@/types/shared"

function CardContainer({
  children,
  className,
  rounded = "rounded-xl",
}: PropsWithChildrenCx<{
  rounded?: string
}>) {
  return (
    <section
      className={`p-6 border border-zinc-100 bg-zinc-50 ${rounded} ${className}`}
    >
      {children}
    </section>
  )
}

export default CardContainer

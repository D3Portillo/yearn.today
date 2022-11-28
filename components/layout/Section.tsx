import { PropsWithChildrenCx } from "@/types/shared"

function Section({
  children,
  className,
  as: Container = "main",
  ...extras
}: PropsWithChildrenCx<{
  as?: any
}>) {
  return (
    <Container
      {...extras}
      className={`px-4 max-w-screen-xl mx-auto ${className}`}
    >
      {children}
    </Container>
  )
}

export default Section

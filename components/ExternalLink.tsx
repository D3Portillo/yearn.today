import { PropsWithChildrenCx } from "@/types/shared"
import Link from "next/link"

const ExternalLink = ({
  href,
  children,
  className,
  decorate,
}: PropsWithChildrenCx<{
  href: string
  /** When true some styling will be applied over the element */
  decorate?: boolean
}>) => (
  <Link
    className={`${decorate && "hover:underline text-yearn-blue"} ${className}`}
    target="_blank"
    href={href}
  >
    {children}
  </Link>
)

export default ExternalLink

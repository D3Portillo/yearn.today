import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import Link from "next/link"
import { classnames } from "@/lib/helpers"

function Button({
  className,
  children,
  isLink,
  fontSize = "text-lg",
  borderRadius = "rounded-full",
  ...props
}: PropsWithChildren<
  {
    isLink?: boolean
    target?: string
    href?: string
    /** Your tw text-[size] class */
    fontSize?: string
    /** Your tw rounded-[size] class */
    borderRadius?: string
  } & ButtonHTMLAttributes<{}>
>) {
  const Wrapper = (isLink ? Link : "button") as any
  return (
    <Wrapper
      {...props}
      className={classnames(
        className,
        borderRadius,
        fontSize,
        "bg-yearn-blue py-2 px-6 text-white"
      )}
    >
      {children}
    </Wrapper>
  )
}

export default Button

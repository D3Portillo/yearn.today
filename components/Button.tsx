import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import Link from "next/link"
import { classnames } from "@/lib/helpers"

function Button({
  className,
  children,
  isLink,
  fontSize = "text-lg",
  borderRadius = "rounded-full",
  isDisabled,
  ...props
}: PropsWithChildren<
  {
    isDisabled?: boolean
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
      disabled={isDisabled}
      {...props}
      className={classnames(
        className,
        borderRadius,
        fontSize,
        "py-2 px-6",
        isDisabled ? "bg-black/5 text-black/25" : "bg-yearn-blue text-white"
      )}
    >
      {children}
    </Wrapper>
  )
}

export default Button

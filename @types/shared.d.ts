import { type PropsWithChildren } from "react"

export type PropsWithChildrenCx<Props = unknown> = PropsWithChildren<Props> & {
  className?: string
}

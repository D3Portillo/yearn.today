import { type PropsWithChildren } from "react"

export type PropsWithChildrenCx<Props = any> = PropsWithChildren<Props> & {
  className?: string
}

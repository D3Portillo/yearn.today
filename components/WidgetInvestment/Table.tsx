import type { PropsWithChildren } from "react"

function Table({ children }: PropsWithChildren) {
  return (
    <table className="text-zinc-600 w-full">
      <tbody>{children}</tbody>
    </table>
  )
}

export function Row({
  children,
  title,
}: PropsWithChildren<{
  title: string
}>) {
  return (
    <tr>
      <td className="font-bold whitespace-nowrap">{title}:</td>
      <td className="pl-4">{children}</td>
    </tr>
  )
}

export default Table

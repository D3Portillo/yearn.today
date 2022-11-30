export const withPreventDefault = (callback: () => void) => {
  return (e: any) => {
    e?.preventDefault()
    callback()
  }
}

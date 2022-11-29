import { useState } from "react"

function useAsyncState<T>(initState: T) {
  const [state, forceSetState] = useState<T>(initState)

  const stateSetter = (newState: Partial<T>) =>
    forceSetState((state: any) => ({ ...state, ...newState }))

  return [state, stateSetter, forceSetState] as const
}

export default useAsyncState

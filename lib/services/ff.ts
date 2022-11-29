const joinPathForAPI = (path: any) =>
  `/api${Array.isArray(path) ? path.join("/") : path}`

const get = <R = any>(
  endpoint: string | any[],
  config?: RequestInit
): Promise<R> => {
  const path = joinPathForAPI(endpoint)
  return fetch(path, config).then((r) => r.json())
}

/**
 * F*ck Fetch
 *
 * @example
 * // Easy peasy typed fetching
 * ff.get("/endpoint") // fetches /api/endpoint
 * ff.get(["/endpoint", 1]) // fetches /api/endpoint/1
 */
export default {
  get,
} as const

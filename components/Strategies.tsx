import { type Vault as YearnVaultType } from "@yfi/sdk"
import { marked } from "marked"

function Strategies({
  strategies,
}: Pick<YearnVaultType["metadata"], "strategies">) {
  return (
    <div className="flex-grow">
      <h2>Deposit Strategies</h2>
      <div className="flex gap-4 mt-4 flex-wrap">
        {strategies?.strategiesMetadata.map((strategy) => {
          return (
            <details
              key={`strategy-${strategy.address}`}
              className="group w-full lg:max-w-sm"
            >
              <summary className="flex select-none cursor-pointer items-center justify-between rounded-lg bg-[rgba(0,0,0,0.02)] p-4">
                <h3 className="font-medium text-gray-900 whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {strategy.name}
                </h3>
                <svg
                  className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <section
                data-type="md-container"
                dangerouslySetInnerHTML={{
                  __html: marked
                    .parse(strategy.description)
                    .replace(/href=/g, `target="_blank" href=`),
                }}
                className="mt-2 text-sm px-4 leading-relaxed text-gray-700"
              />
            </details>
          )
        })}
      </div>
    </div>
  )
}

export default Strategies

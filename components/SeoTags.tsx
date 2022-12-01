import { NextSeo } from "next-seo"
import { useMemo } from "react"

const URL = "https://yearn.today"
const TWITTER_HANDLE = "Interlacehq"
export const DEFAULT_CONFIG = {
  title: "YieldEarn Yoday 💸",
  url: URL,
  seoURL: `${URL}/seo.png`,
  description: "💸 Invest on stable vaults to earn constant rewards.",
}

function SeoTags(props: Partial<typeof DEFAULT_CONFIG>) {
  const SEO = useMemo(() => {
    return Object.keys(DEFAULT_CONFIG).reduce((obj, key) => {
      // if prop.value is defined then replace default SEO
      const value = (props as any)[key] as any
      return Object.assign(obj, value ? { [key]: value } : {})
    }, DEFAULT_CONFIG)
  }, [props])

  return (
    <NextSeo
      title={SEO.title}
      additionalLinkTags={[
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ]}
      twitter={{
        cardType: "summary_large_image",
        handle: TWITTER_HANDLE,
        site: SEO.url,
      }}
      openGraph={{
        type: "website",
        url: SEO.url,
        title: SEO.title,
        description: SEO.description,
        images: [
          {
            url: SEO.seoURL,
            alt: SEO.seoURL,
            width: 1000, // 1200,
            height: 1000, // 630,
          },
        ],
      }}
      description={SEO.description}
    />
  )
}

export default SeoTags

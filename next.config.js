/** @type { import('next').NextConfig } */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["raw.githubusercontent.com", "rawcdn.githack.com"],
    minimumCacheTTL: 6000000,
  },
}

module.exports = nextConfig

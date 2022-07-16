/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// next.config.js
module.exports = {
  images: {
    domains: ['media.api-sports.io'],
  },
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_DOMAIN,"static-cdn.jtvnw.net"],
  },
}

module.exports = nextConfig

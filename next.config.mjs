/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [new URL(process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').hostname],
   
  },
  devIndicators: false,
}

export default nextConfig

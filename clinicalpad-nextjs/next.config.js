/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable during builds for faster compilation
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds for initial migration
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

module.exports = nextConfig
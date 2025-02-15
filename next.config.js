/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "motion": require.resolve("framer-motion"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/we_landing' : '',
}

module.exports = nextConfig
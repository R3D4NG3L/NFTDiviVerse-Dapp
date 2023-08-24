/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: './',
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;

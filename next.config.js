/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  optimizeFonts: false,
  images: {
    domains: ['parsefiles.back4app.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
};

module.exports = nextConfig;

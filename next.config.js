/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["bullmq"],
  },
};

module.exports = nextConfig;

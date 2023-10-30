/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: { level: "verbose", fullUrl: true },
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;

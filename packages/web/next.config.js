/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: { level: "verbose", fullUrl: true },
  },
};

module.exports = nextConfig;

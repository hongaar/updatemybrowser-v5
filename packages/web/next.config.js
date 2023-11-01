/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: { level: "verbose", fullUrl: true },
  },
  images: {
    domains: ["cdn.sanity.io", "img.youtube.com"],
  },
};

export default nextConfig;

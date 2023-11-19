/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["cdn.sanity.io", "img.youtube.com"],
  },
};

export default nextConfig;

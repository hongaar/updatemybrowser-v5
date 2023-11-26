/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://v1.updatemybrowser.org",
        permanent: false,
      },
      { source: "/browser", destination: "/en/check", permanent: true },
      { source: "/about", destination: "/en/check", permanent: true },
      { source: "/about/docs", destination: "/en/widget", permanent: true },
      { source: "/about/plugins", destination: "/en/widget", permanent: true },
      { source: "/about/contact", destination: "/en/check", permanent: true },
      { source: "/about/stats", destination: "/en/check", permanent: true },
      { source: "/widget.html", destination: "/en/widget", permanent: true },
    ];
  },
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

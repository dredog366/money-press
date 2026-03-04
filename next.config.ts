import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "https://shop.facetea.org",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

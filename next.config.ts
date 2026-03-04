import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "https://facetea.org/shop",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

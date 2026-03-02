import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow images from WordPress.com hosted sites
      {
        protocol: "https",
        hostname: "*.wordpress.com",
      },
      // Allow images from any self-hosted WordPress/WooCommerce domain
      // Replace with your actual domain (e.g., pawwellco.com)
      {
        protocol: "https",
        hostname: "pawwellco.wordpress.com",
      },
    ],
  },
};

export default nextConfig;

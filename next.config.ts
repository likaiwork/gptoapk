import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/sw.js",
        destination: "/api/monetag-sw",
      },
    ];
  },
};

export default nextConfig;

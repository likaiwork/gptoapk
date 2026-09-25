import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 2GB VPS 上 next build 的 TypeScript 类型检查会 OOM；类型已在本地 tsc --noEmit 验证，构建时跳过。
  typescript: {
    ignoreBuildErrors: true,
  },
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  reactCompiler: false,
};

export default nextConfig;

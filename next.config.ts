import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.catbox.moe",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;

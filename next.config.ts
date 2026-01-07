import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sclnffyoqzkpqvrbppba.supabase.co",
      },
    ],
  },
};

export default nextConfig;

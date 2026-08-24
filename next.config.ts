import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      new URL("https://i.postimg.cc/KzR9rHgh/**"),
    ],
  },
};

export default nextConfig;

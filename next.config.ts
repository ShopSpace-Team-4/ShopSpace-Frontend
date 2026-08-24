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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/drkydbtrt/image/upload/**",
      },
      new URL("https://i.postimg.cc/KzR9rHgh/**"),
    ],
  },
};

export default nextConfig;

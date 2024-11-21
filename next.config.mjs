import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    BACK_END_URL: process.env.BACK_END_URL,
    AGORA_APP_ID: process.env.NEXT_PUBLIC_AGORA_APP_ID,
  },
};

export default nextConfig;

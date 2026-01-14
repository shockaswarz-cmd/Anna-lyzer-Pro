import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rightmove.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'lid.zoocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'media.onthemarket.com',
      },
      {
        protocol: 'https',
        hostname: 'content.onthemarket.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;

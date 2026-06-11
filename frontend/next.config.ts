import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['backend-portfolio.chairulikhsanworks.my.id'],
    qualities: [75, 100],
    formats: ['image/avif', 'image/webp'],
  },

  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: 'https://backend-portfolio.chairulikhsanworks.my.id/storage/:path*',
      },
    ];
  },
};

export default nextConfig;
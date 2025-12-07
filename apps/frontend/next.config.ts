import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'lh3.googleusercontent.com',
      'source.unsplash.com',
      'plus.unsplash.com'
    ],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
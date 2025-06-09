import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 👈 Esto es CRUCIAL para GitHub Pages
  basePath: '/aecc-uide-web',
  trailingSlash: true, // Recomendado para GitHub Pages
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
};

export default nextConfig;

// next.config.ts
import type { NextConfig } from 'next';

const isGithubPages = process.env.IS_GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
	// Si es GitHub Pages exporta estático, si es Vercel permite SSR/ISR
	output: isGithubPages ? 'export' : undefined,

	// Solo aplica la subruta si estamos en GitHub Pages
	basePath: isGithubPages ? '/aecc-uide-web' : '',

	// Necesario para que las rutas funcionen en el servidor estático de GitHub
	trailingSlash: true,

	images: {
		// Vercel optimiza imágenes automáticamente; GitHub Pages requiere desactivarlo
		unoptimized: isGithubPages,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.pinimg.com',
			},
			{
				protocol: 'https',
				hostname: 'www.uide.edu.ec',
			},
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
			},
			{
				protocol: 'https',
				hostname: 'linktr.ee',
			},
			{
				protocol: 'https',
				hostname: 'cdn3d.iconscout.com',
			},
			{
				protocol: 'https',
				hostname: 'img.pikbest.com',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
};

export default nextConfig;

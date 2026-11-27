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

	// Permite abrir el dev server desde otros equipos de la red local.
	// Sin esto Next bloquea /_next/hmr y los recursos de desarrollo cuando
	// se entra por la IP en lugar de localhost. Solo aplica en `next dev`.
	// El comodín cubre toda la subred, así que no se rompe si cambia la IP.
	allowedDevOrigins: ['192.168.100.*', '192.168.1.*'],

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
			{
				protocol: 'https',
				hostname: 'advertise.ieee.org',
			},
			{
				protocol: 'https',
				hostname: 'ieeevbitsb.in',
			},
			{
				protocol: 'https',
				hostname: 'r9.ieee.org',
			},
			{
				protocol: 'https',
				hostname: 'images.lumacdn.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
			},
		],
	},
};

export default nextConfig;

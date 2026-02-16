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
	},
};

export default nextConfig;

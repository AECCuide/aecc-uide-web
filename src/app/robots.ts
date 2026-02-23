import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL ?? 'https://aecc-uide-web.vercel.app';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			// 🌎 Regla general para todos los bots
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/private/', '/admin/'],
			},

			// 🔎 Motores de búsqueda principales
			{
				userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-News'],
				allow: '/',
				disallow: ['/private/'],
			},
			{
				userAgent: 'Bingbot',
				allow: '/',
				disallow: ['/private/'],
			},
			{
				userAgent: 'Applebot',
				allow: '/',
				disallow: ['/private/'],
			},

			// 🤖 Bots de IA / LLM conocidos
			{
				userAgent: [
					'GPTBot', // OpenAI
					'ChatGPT-User', // Navegación ChatGPT
					'CCBot', // Common Crawl
					'ClaudeBot', // Anthropic
					'anthropic-ai',
					'PerplexityBot',
					'YouBot',
				],
				allow: '/',
				disallow: ['/private/'],
				crawlDelay: 10,
			},

			// 📱 Redes sociales (previews)
			{
				userAgent: [
					'Twitterbot',
					'facebookexternalhit',
					'LinkedInBot',
					'Slackbot',
				],
				allow: '/',
			},

			// 🛠 Herramientas SEO
			{
				userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot'],
				allow: '/',
				crawlDelay: 15,
			},
		],

		sitemap: `https://${BASE_URL}/sitemap.xml`,
		host: `https://${BASE_URL}`,
	};
}

/**
 * URLs del sitio, en un solo lugar.
 *
 * El proyecto se publica de dos formas (ver next.config.ts): como export
 * estatico en GitHub Pages bajo la subruta /aecc-uide-web, o con SSR sin
 * subruta. Los metadatos tienen que funcionar en ambos casos, asi que el
 * prefijo se deriva de la MISMA variable que decide el basePath.
 */

const isGithubPages = process.env.IS_GITHUB_PAGES === 'true';

/** Prefijo de rutas. Debe coincidir con `basePath` de next.config.ts. */
export const BASE_PATH = isGithubPages ? '/aecc-uide-web' : '';

/**
 * URL publica del sitio. Los scrapers de WhatsApp, Telegram y similares
 * exigen URLs ABSOLUTAS en og:image: una ruta relativa no les sirve.
 */
export const SITE_URL =
	process.env.NEXT_PUBLIC_BASE_URL ??
	'https://aeccuide.github.io/aecc-uide-web';

/** Ruta de un archivo de public/, con el prefijo que corresponda. */
export function asset(path: string): string {
	return `${BASE_PATH}${path}`;
}

/** URL absoluta, para metadatos que no admiten rutas relativas. */
export function absolute(path: string): string {
	return `${SITE_URL}${path}`;
}

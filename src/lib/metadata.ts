import type { Metadata } from 'next';
import { absolute } from './site';

/**
 * Armador de metadatos para compartir enlaces.
 *
 * Puntos que importan para que WhatsApp muestre la tarjeta:
 *  - og:image tiene que ser PNG o JPG. No sirve SVG ni .ico.
 *  - la URL tiene que ser absoluta.
 *  - conviene declarar width/height reales y un peso por debajo de ~300 KB.
 */
export function buildMetadata({
	title,
	description,
	path,
	image,
	imageAlt,
}: {
	title: string;
	description: string;
	/** Ruta de la pagina, empezando con /. */
	path: string;
	/** Archivo en public/, p. ej. /og-cuarenta.png */
	image: string;
	imageAlt: string;
}): Metadata {
	// El proyecto usa trailingSlash: true, asi que el canonical tiene que
	// terminar en barra o apuntaria a una URL que redirige.
	const normalized = path.endsWith('/') ? path : `${path}/`;
	const url = absolute(normalized);
	const imageUrl = absolute(image);

	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			type: 'website',
			siteName: 'AECC UIDE',
			locale: 'es_EC',
			title,
			description,
			url,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: imageAlt,
					type: 'image/png',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [imageUrl],
		},
	};
}

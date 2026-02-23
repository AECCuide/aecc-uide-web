import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'AECC',
		short_name: 'AECC',
		description:
			'Asociación de Estudiantes de Ciencias de la Computación de la Universidad Internacional del Ecuador UIDE Quito',
		start_url: '/',
		display: 'standalone',
		background_color: '#181818',
		theme_color: '#181818',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	};
}

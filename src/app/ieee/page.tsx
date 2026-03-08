import type { Metadata } from 'next';
import IEEEModule from '@/modules/ieee';

export const metadata: Metadata = {
	title: 'IEEE UIDE',
	description:
		'Explora el Capítulo Estudiantil IEEE de la Universidad Internacional del Ecuador UIDE. Conoce a nuestras autoridades como nuestro Chair Juan Moromenacho, y sociedades como Computer Society y Communications Society.',
	keywords: [
		'capitulo ieee uide',
		'juan moromenacho ieee',
		'computer society uide',
		'communications society uide',
		'ieee ecuador',
		'ieee uide',
	],
};

export default function IEEEPage() {
	return (
		<main
			className="min-h-screen w-full relative overflow-hidden"
			style={{
				background: `
					radial-gradient(circle at 10% 0%, 
						rgba(0, 181, 226, 0.4) 0%, 
						rgba(0, 181, 226, 0.2) 20%, 
						rgba(0, 181, 226, 0.1) 40%, 
						rgba(0, 181, 226, 0.05) 60%, 
						transparent 80%),
					radial-gradient(circle at 90% 100%, 
						rgba(0, 98, 155, 0.4) 0%, 
						rgba(0, 98, 155, 0.2) 20%, 
						rgba(0, 98, 155, 0.1) 40%, 
						rgba(0, 98, 155, 0.05) 60%, 
						transparent 80%),
					var(--background)
				`,
			}}
		>
			<div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24">
				<IEEEModule />
			</div>
		</main>
	);
}

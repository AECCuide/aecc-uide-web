'use client';

import GalleryAnimation from '@/modules/tutorias/animation/GalleryAnimation';

export default function InfoPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Animación GSAP de Galería */}
			<GalleryAnimation>
				<div className="max-w-4xl mx-auto space-y-8">
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-(--text-color)">
						Información
					</h2>
				</div>
			</GalleryAnimation>
		</div>
	);
}

'use client';

import GalleryAnimation from '../animation/GalleryAnimation';
import SubjectsSection from '../components/SubjectsSection';

export default function TutoriasPage() {
	return (
		<div
			className="min-h-screen"
			style={{
				backgroundColor: 'var(--background)',
				color: 'var(--foreground)',
			}}
		>
			{/* Animación GSAP de Galería */}
			<GalleryAnimation>
				<div className="max-w-4xl mx-auto space-y-8">
					<h2
						className="text-4xl md:text-5xl font-bold mb-6 text-center"
						style={{ color: 'var(--text-color)' }}
					>
						Tutorías AECC
					</h2>
					<p
						className="text-xl leading-relaxed"
						style={{ color: 'var(--text-color-secondary)' }}
					>
						Bienvenido a la sección de Tutorías. Aquí podrás encontrar apoyo
						académico proporcionado por estudiantes de semestres superiores,
						dispuestos a ayudarte a resolver dudas y mejorar tu rendimiento.
					</p>
				</div>
			</GalleryAnimation>

			{/* Sección de Materias */}
			<SubjectsSection />
		</div>
	);
}

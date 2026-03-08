'use client';

import SubjectsSection from './components/SubjectsSection';

export default function TutoriasPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20 mt-12">
				<div className="mb-3">
					<h2 className="title-h1 text-center text-(--text-color)">
						Tutorías AECC
					</h2>
				</div>
				<p className="text-lg md:text-xl leading-relaxed text-left text-(--text-color-secondary) max-w-4xl mx-auto">
					Bienvenido a la sección de Tutorías. Aquí podrás encontrar apoyo
					académico proporcionado por estudiantes de semestres superiores,
					dispuestos a ayudarte a resolver dudas y mejorar tu rendimiento.
				</p>
			</div>

			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20 py-8">
				<div className="mb-3">
					<h1 className="title-h1">Materias</h1>
				</div>
				<SubjectsSection />
			</div>
		</div>
	);
}

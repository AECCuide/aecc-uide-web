'use client';

import { useState } from 'react';
import Card, { CardData } from '@/components/ui/card';
import SubjectDetailsModal from './SubjectDetailsModal';
import { motion } from 'framer-motion';

const subjectsData: CardData[] = [
	{
		title: 'Redes Inalámbricas e Infraestructura',
		description:
			'Aprende sobre el diseño, implementación y seguridad de redes modernas.',
		badge: 'Tutoría',
		provider: 'Profesor / Estudiante',
		tags: ['Redes', 'Cisco', 'Seguridad'],
		image:
			'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80',
		slug: '#',
	},
	{
		title: 'Programación',
		description: 'Fundamentos de lógica, algoritmos y desarrollo de software.',
		badge: 'Tutoría',
		provider: 'Profesor / Estudiante',
		tags: ['Lógica', 'Código', 'Desarrollo', 'Java', 'Python'],
		image:
			'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
		slug: '#',
	},
	{
		title: 'Base de Datos',
		description:
			'Modelado, consultas SQL y administración de datos estructurados.',
		badge: 'Tutoría',
		provider: 'Profesor / Estudiante',
		tags: ['SQL', 'Modelado', 'Bases de Datos'],
		image:
			'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80',
		slug: '#',
	},
	{
		title: 'Gestión Cloud',
		description:
			'Despliegue, escalabilidad y servicios en la nube (AWS, Azure, GCP).',
		badge: 'Tutoría',
		provider: 'Profesor / Estudiante',
		tags: ['AWS', 'Cloud computing', 'DevOps'],
		image:
			'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
		slug: '#',
	},
];

export default function SubjectsSection() {
	const [selectedSubject, setSelectedSubject] = useState<CardData | null>(null);

	return (
		<section className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
			<h2
				className="text-3xl md:text-5xl font-bold mb-10 text-center"
				style={{ color: 'var(--text-color)' }}
			>
				Materias
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
				{subjectsData.map((subject) => (
					<motion.div
						key={(subject.title || 'materia')
							.replace(/\s+/g, '-')
							.toLowerCase()}
						className="w-full flex justify-center cursor-pointer"
						onClick={() => setSelectedSubject(subject)}
						whileHover={{ y: -8, scale: 1.02 }}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					>
						<Card cardData={subject} />
					</motion.div>
				))}
			</div>

			{/* Modal Wrapper */}
			<SubjectDetailsModal
				subject={selectedSubject}
				isOpen={!!selectedSubject}
				onClose={() => setSelectedSubject(null)}
			/>
		</section>
	);
}

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const activities = [
	{
		id: 1,
		title: 'Eventos IEEE',
		time: 'Próximamente',
		active: true,
		avatars: [
			'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64&h=64',
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=64&h=64',
		],
	},
	{
		id: 2,
		title: 'Proyectos',
		time: 'Activos',
		active: false,
		avatars: [
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64&h=64',
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=64&h=64',
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=64&h=64',
		],
	},
	{
		id: 3,
		title: 'Cursos',
		time: '10:30 AM',
		active: false,
		avatars: [
			'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64&h=64',
		],
	},
];

const capitulosLabels = [
	{
		id: 1,
		title: 'Computer Society',
		image: 'https://ieeevbitsb.in/placeholders/cs_logo.webp',
	},
	{
		id: 2,
		title: 'Communications Society',
		image:
			'https://r9.ieee.org/ecuador/wp-content/uploads/sites/110/2020/02/Logo_ComSoc.png',
	},
];

const officers = [
	{ role: 'Chair', name: 'Juan Moromenacho' },
	{ role: 'Counselor', name: 'Bryan Vinueza' },
	{ role: 'Secretary', name: 'Position Vacant' },
	{ role: 'Treasurer', name: 'Position Vacant' },
	{ role: 'Vice Chair', name: 'Position Vacant' },
	{ role: 'Webmaster', name: 'Position Vacant' },
];

export default function IEEEModule() {
	return (
		<div className="w-full space-y-8">
			{/* Header */}
			<div className="space-y-2">
				<h1 className="text-3xl md:text-5xl font-bold tracking-tight text-(--text-color) mb-8">
					¿Listos para los Retos de Hoy?
				</h1>
			</div>

			{/* Cards Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{activities.map((activity) => (
					<motion.div
						key={activity.id}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={`relative p-5 rounded-3xl h-48 flex flex-col justify-between cursor-pointer transition-all ${
							activity.active
								? 'bg-[#00B5E2] text-white shadow-lg shadow-[#00B5E2]/30'
								: 'bg-(--card)  shadow-sm text-(--text-color) hover:shadow-md'
						}`}
					>
						<div className="flex justify-between items-start">
							{/* Top Right Icon */}
							<button
								type="button"
								className="p-1 rounded-full bg-(--foreground)/10 hover:bg-(--foreground)/20 transition-colors"
							>
								<ArrowUpRight size={14} className="opacity-80" />
							</button>
						</div>

						<div className="mt-auto">
							<h3 className="font-semibold text-lg tracking-tight">
								{activity.title}
							</h3>
							<p
								className={`text-sm font-medium mt-1 ${activity.active ? 'text-white/80' : 'text-(--text-color-secondary)'}`}
							>
								{activity.time}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* Capítulos Section */}
			<div className="mt-12 space-y-4">
				<h2 className="text-2xl font-bold text-(--text-color) mb-6">
					Capítulos Estudiantiles
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{capitulosLabels.map((capitulo) => (
						<motion.div
							key={capitulo.id}
							whileHover={{ scale: 1.02, y: -2 }}
							className="relative p-6 rounded-3xl flex items-center gap-6 cursor-pointer  bg-(--card) shadow-sm hover:shadow-md transition-all"
						>
							<div className="relative w-20 h-20 flex items-center justify-center rounded-2xl p-2 shrink-0 bg-white">
								<Image
									src={capitulo.image}
									alt={capitulo.title}
									fill
									className="object-contain p-2"
								/>
							</div>
							<div>
								<h3 className="font-semibold text-xl tracking-tight text-(--text-color)">
									{capitulo.title}
								</h3>
								<p className="text-(--text-color-secondary) text-sm mt-1">
									Capítulo Activo
								</p>
							</div>
							<div className="ml-auto p-2 rounded-full bg-(--foreground)/5 hover:bg-(--foreground)/10">
								<ArrowUpRight
									size={18}
									className="text-(--text-color-secondary)"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Officer Positions Section */}
			<div className="mt-12 space-y-4 pb-12">
				<h2 className="text-2xl font-bold text-(--text-color) mb-6">
					Autoridades (Officer Positions)
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{officers.map((officer, index) => {
						const isVacant = officer.name === 'Position Vacant';
						return (
							<motion.div
								// biome-ignore lint/suspicious/noArrayIndexKey: officer list is static
								key={index}
								whileHover={{ scale: 1.02, y: -2 }}
								className={`p-5 rounded-3xl  shadow-sm flex flex-col justify-center transition-all ${
									isVacant ? 'bg-(--muted) opacity-70' : 'bg-(--card)'
								}`}
							>
								<div className="flex items-center gap-3 mb-3">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
											isVacant
												? 'bg-(--muted) text-(--text-color-muted)'
												: 'bg-[#00B5E2] text-[#ffffff] shadow-lg shadow-[#00B5E2]/20'
										}`}
									>
										{isVacant ? '?' : officer.name.charAt(0)}
									</div>
									<h3 className="font-semibold text-(--text-color) leading-tight">
										{officer.role}
									</h3>
								</div>
								<p
									className={`text-sm ${isVacant ? 'text-(--text-color-muted) italic' : 'text-(--text-color-secondary) font-medium'}`}
								>
									{officer.name}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

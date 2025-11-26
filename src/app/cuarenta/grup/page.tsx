'use client';

import Image from 'next/image';
import React from 'react';
import { Check, X, Trash2, Phone as PhoneIcon } from 'lucide-react';
import { useGrup, TeamData } from './usegrup';

// --- Utilidades ---

const getInitials = (name: string) => {
	const parts = name.split(' ');
	return parts.length >= 2
		? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
		: name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name: string) => {
	const colors = [
		'bg-blue-500',
		'bg-purple-500',
		'bg-pink-500',
		'bg-green-500',
		'bg-yellow-500',
		'bg-red-500',
		'bg-indigo-500',
		'bg-teal-500',
	];
	return colors[name.charCodeAt(0) % colors.length];
};

// --- Componentes de Celdas Reutilizables ---

const TeamNameCell: React.FC<{ team: TeamData }> = ({ team }) => (
	<div className="flex flex-col">
		<span className="text-text-color font-semibold text-sm transition-colors">
			{team.teamName}
		</span>
		<span className="text-text-color-muted text-xs font-mono transition-colors">
			{team.id}
		</span>
	</div>
);

const ParticipantCell: React.FC<{ name: string }> = ({ name }) => (
	<div className="flex items-center gap-3">
		<div
			className={`w-10 h-10 rounded-full ${getAvatarColor(name)} flex items-center justify-center text-white font-semibold text-sm`}
		>
			{getInitials(name)}
		</div>
		<span className="text-text-color text-sm font-medium transition-colors">
			{name}
		</span>
	</div>
);

const CourseCell: React.FC<{ course: string }> = ({ course }) => (
	<span className="text-text-color-secondary text-sm transition-colors">
		{course}
	</span>
);

const ContactCell: React.FC<{ phone: string }> = ({ phone }) => (
	<div className="flex items-center gap-1.5 text-text-color-secondary text-xs transition-colors">
		<PhoneIcon className="w-3.5 h-3.5" />
		<span className="font-mono">{phone}</span>
	</div>
);

const PaymentMethodCell: React.FC<{ method: string }> = ({ method }) => (
	<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-background-input text-text-color text-xs font-medium transition-colors">
		{method}
	</span>
);

const DateCell: React.FC<{
	timestamp: string;
	formatDate: (ts: string) => string;
}> = ({ timestamp, formatDate }) => (
	<span className="text-text-color-secondary text-xs whitespace-nowrap transition-colors">
		{formatDate(timestamp)}
	</span>
);

const StatusCell: React.FC<{
	team: TeamData;
	onToggle: (id: string, pagado: boolean) => void;
}> = ({ team, onToggle }) => (
	<button
		onClick={() => {
			onToggle(team.id, team.pagado);
		}}
		className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
			team.pagado
				? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900'
				: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900'
		}`}
	>
		{team.pagado ? (
			<>
				<Check className="w-3.5 h-3.5" /> Pagado
			</>
		) : (
			<>
				<X className="w-3.5 h-3.5" /> Pendiente
			</>
		)}
	</button>
);

const ActionsCell: React.FC<{
	team: TeamData;
	onToggle: (id: string, pagado: boolean) => void;
	onDelete: (id: string) => void;
}> = ({ team, onToggle, onDelete }) => (
	<div className="flex items-center justify-center gap-2">
		<button
			onClick={() => {
				onToggle(team.id, team.pagado);
			}}
			className={`p-1.5 rounded-md transition-all ${
				team.pagado
					? 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900'
					: 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900'
			}`}
			title={team.pagado ? 'Marcar como no pagado' : 'Marcar como pagado'}
		>
			{team.pagado ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
		</button>
		<button
			onClick={() => {
				if (
					window.confirm(
						`¿Estás seguro de eliminar al equipo "${team.teamName}"?`
					)
				) {
					onDelete(team.id);
				}
			}}
			className="p-1.5 rounded-md bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-all"
			title="Eliminar equipo"
		>
			<Trash2 className="w-4 h-4" />
		</button>
	</div>
);

// --- Tipos y Configuración ---

interface ColumnConfig {
	header: string;
	cell: (team: TeamData) => React.ReactNode;
	textAlign?: 'left' | 'center' | 'right';
}

interface ParticipantConfig {
	key: 'participant1' | 'participant2';
	label: string;
}

// --- Componente Principal ---

export default function GrupManagement() {
	const { teams, loading, togglePayment, deleteTeam, formatDate } = useGrup();

	// Configuración de participantes (dinámico)
	const participants: ParticipantConfig[] = [
		{ key: 'participant1', label: 'Participante 1' },
		{ key: 'participant2', label: 'Participante 2' },
	];

	// Generar columnas dinámicamente
	const generateColumns = (): ColumnConfig[] => {
		const columns: ColumnConfig[] = [
			{
				header: 'Equipo',
				cell: (team) => <TeamNameCell team={team} />,
			},
		];

		// Agregar columnas de participantes dinámicamente
		participants.forEach((participant) => {
			columns.push(
				{
					header: participant.label,
					cell: (team) => (
						<ParticipantCell name={team.participants[participant.key].name} />
					),
				},
				{
					header: 'Curso',
					cell: (team) => (
						<CourseCell course={team.participants[participant.key].course} />
					),
				},
				{
					header: 'Contacto',
					cell: (team) => (
						<ContactCell phone={team.participants[participant.key].phone} />
					),
				}
			);
		});

		// Agregar columnas finales
		columns.push(
			{
				header: 'Método',
				cell: (team) => <PaymentMethodCell method={team.paymentMethod} />,
			},
			{
				header: 'Imagen',
				cell: (team) =>
					team.ImageUrl ? (
						<Image
							src={team.ImageUrl}
							alt="Team"
							width={32}
							height={32}
							className="object-cover rounded-full"
						/>
					) : null,
			},
			{
				header: 'Fecha',
				cell: (team) => (
					<DateCell timestamp={team.timestamp} formatDate={formatDate} />
				),
			},
			{
				header: 'Estado',
				cell: (team) => <StatusCell team={team} onToggle={togglePayment} />,
				textAlign: 'center',
			},
			{
				header: 'Acciones',
				cell: (team) => (
					<ActionsCell
						team={team}
						onToggle={togglePayment}
						onDelete={deleteTeam}
					/>
				),
				textAlign: 'center',
			}
		);

		return columns;
	};

	const columns = generateColumns();

	if (loading) {
		return (
			<div className="min-h-screen bg-linear-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-zinc-900 dark:via-neutral-900 dark:to-stone-900 flex items-center justify-center transition-colors">
				<div className="text-text-color-secondary text-lg transition-colors">
					Cargando equipos...
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-stone-50 dark:bg-zinc-950 p-6 transition-colors">
			<div className="max-w-[1600px] mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-text-color transition-colors">
						Administración de Equipos
					</h1>
					<p className="text-text-color-secondary text-sm mt-1 transition-colors">
						Total de equipos: {teams.length}
					</p>
				</div>

				{/* Table Container */}
				<div className="bg-background rounded-xl border border-border overflow-hidden transition-colors">
					<div className="overflow-x-auto">
						<table className="w-full">
							{/* Table Header */}
							<thead>
								<tr className="border-b border-border bg-background-input/30 transition-colors">
									{columns.map((col, index) => (
										<th
											key={index}
											className={`px-6 py-3 text-${col.textAlign ?? 'left'} text-text-color-secondary text-xs font-medium transition-colors`}
										>
											{col.header}
										</th>
									))}
								</tr>
							</thead>

							{/* Table Body */}
							<tbody className="divide-y divide-border transition-colors">
								{teams.length === 0 ? (
									<tr>
										<td
											colSpan={columns.length}
											className="px-6 py-12 text-center text-text-color-secondary transition-colors"
										>
											No hay equipos registrados
										</td>
									</tr>
								) : (
									teams.map((team) => (
										<tr
											key={team.id}
											className="hover:bg-background-input/20 transition-colors"
										>
											{columns.map((col, index) => (
												<td
													key={index}
													className={`px-6 py-4 transition-colors text-${col.textAlign ?? 'left'}`}
												>
													{col.cell(team)}
												</td>
											))}
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Summary */}
				{teams.length > 0 && (
					<div className="mt-4 flex gap-6 text-sm transition-colors">
						<div className="text-text-color-secondary transition-colors">
							Pagados:{' '}
							<span className="font-semibold text-green-600 dark:text-green-400">
								{teams.filter((team) => team.pagado).length}
							</span>
						</div>
						<div className="text-text-color-secondary transition-colors">
							Pendientes:{' '}
							<span className="font-semibold text-red-600 dark:text-red-400">
								{teams.filter((team) => !team.pagado).length}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

'use client';

import React from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import { useGrup } from './usegrup';

export default function GrupManagement() {
	const { teams, loading, togglePayment, deleteTeam, formatDate } = useGrup();

	if (loading) {
		return (
			<div className="min-h-screen bg-linear-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-zinc-900 dark:via-neutral-900 dark:to-stone-900 flex items-center justify-center transition-colors">
				<div className="text-(--text-color-secondary) text-lg transition-colors">
					Cargando equipos...
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-zinc-900 dark:via-neutral-900 dark:to-stone-900 p-6 transition-colors">
			<div className="max-w-[1400px] mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-3xl md:text-4xl font-bold text-(--text-color) tracking-wider transition-colors">
						Administración de Equipos
					</h1>
					<p className="text-(--text-color-secondary) mt-2 transition-colors">
						Total de equipos registrados: {teams.length}
					</p>
				</div>

				{/* Table Container */}
				<div className="bg-(--background) rounded-2xl shadow-lg overflow-hidden transition-colors">
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							{/* Table Header */}
							<thead>
								<tr className="bg-(--background-input) border-b-2 border-(--border) transition-colors">
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										ID
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Equipo
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Participante 1
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Curso 1
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Teléfono 1
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Participante 2
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Curso 2
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Teléfono 2
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Método de Pago
									</th>
									<th className="px-4 py-3 text-left text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Fecha
									</th>
									<th className="px-4 py-3 text-center text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Estado Pago
									</th>
									<th className="px-4 py-3 text-center text-(--text-color-secondary) text-xs font-semibold uppercase tracking-wider transition-colors">
										Acciones
									</th>
								</tr>
							</thead>

							{/* Table Body */}
							<tbody>
								{teams.length === 0 ? (
									<tr>
										<td
											colSpan={12}
											className="px-4 py-12 text-center text-(--text-color-secondary) transition-colors"
										>
											No hay equipos registrados
										</td>
									</tr>
								) : (
									teams.map((team, index) => (
										<tr
											key={team.id}
											className={`border-b border-(--border) hover:bg-(--background-input) transition-colors ${
												index % 2 === 0
													? 'bg-(--background)'
													: 'bg-(--background-input)/50'
											}`}
										>
											{/* ID */}
											<td className="px-4 py-3 text-sm text-(--text-color-muted) font-mono transition-colors">
												{team.id}
											</td>

											{/* Team Name */}
											<td className="px-4 py-3 text-sm text-(--text-color) font-semibold transition-colors">
												{team.teamName}
											</td>

											{/* Participant 1 Name */}
											<td className="px-4 py-3 text-sm text-(--text-color) transition-colors">
												{team.participants.participant1.name}
											</td>

											{/* Participant 1 Course */}
											<td className="px-4 py-3 text-sm text-(--text-color-secondary) transition-colors">
												{team.participants.participant1.course}
											</td>

											{/* Participant 1 Phone */}
											<td className="px-4 py-3 text-sm text-(--text-color-secondary) font-mono transition-colors">
												{team.participants.participant1.phone}
											</td>

											{/* Participant 2 Name */}
											<td className="px-4 py-3 text-sm text-(--text-color) transition-colors">
												{team.participants.participant2.name}
											</td>

											{/* Participant 2 Course */}
											<td className="px-4 py-3 text-sm text-(--text-color-secondary) transition-colors">
												{team.participants.participant2.course}
											</td>

											{/* Participant 2 Phone */}
											<td className="px-4 py-3 text-sm text-(--text-color-secondary) font-mono transition-colors">
												{team.participants.participant2.phone}
											</td>

											{/* Payment Method */}
											<td className="px-4 py-3 text-sm text-(--text-color) transition-colors">
												{team.paymentMethod}
											</td>

											{/* Timestamp */}
											<td className="px-4 py-3 text-sm text-(--text-color-secondary) whitespace-nowrap transition-colors">
												{formatDate(team.timestamp)}
											</td>

											{/* Payment Status Toggle */}
											<td className="px-4 py-3 text-center transition-colors">
												<button
													onClick={() => {
														togglePayment(team.id);
													}}
													className={`px-4 py-2 rounded-lg font-medium text-sm transition-all inline-flex items-center gap-2 ${
														team.pagado
															? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
															: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
													}`}
												>
													{team.pagado ? (
														<>
															<Check className="w-4 h-4" />
															Pagado
														</>
													) : (
														<>
															<X className="w-4 h-4" />
															No
														</>
													)}
												</button>
											</td>

											{/* Delete Button */}
											<td className="px-4 py-3 text-center transition-colors">
												<button
													onClick={() => {
														if (
															window.confirm(
																`¿Estás seguro de eliminar al equipo "${team.teamName}"?`
															)
														) {
															deleteTeam(team.id);
														}
													}}
													className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all inline-flex items-center justify-center"
													title="Eliminar equipo"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Summary */}
				{teams.length > 0 && (
					<div className="mt-4 flex gap-6 text-sm text-(--text-color-secondary) transition-colors">
						<div>
							<span className="font-semibold">
								Pagados: {teams.filter((team) => team.pagado).length}
							</span>
						</div>
						<div>
							<span className="font-semibold">
								Pendientes: {teams.filter((team) => !team.pagado).length}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

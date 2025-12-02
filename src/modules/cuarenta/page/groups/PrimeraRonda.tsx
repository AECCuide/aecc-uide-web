'use client';

import { useMemo } from 'react';
import { useGrup, TeamData } from '@/modules/sheets/usegrup';

interface Match {
	mesa: number;
	pareja1: TeamData;
	pareja2: TeamData;
}

function TournamentBracket() {
	const { teams, loading, error } = useGrup();

	// Generar solo primera ronda
	const firstRound = useMemo(() => {
		if (teams.length < 2) return [];

		const matches: Match[] = [];
		const availableTeams = [...teams];
		let mesaCounter = 1;

		// Crear parejas de 2 en 2
		for (let i = 0; i < availableTeams.length; i += 2) {
			if (i + 1 < availableTeams.length) {
				matches.push({
					mesa: mesaCounter,
					pareja1: availableTeams[i],
					pareja2: availableTeams[i + 1],
				});
				mesaCounter++;
			}
		}

		return matches;
	}, [teams]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-12 h-12 border-4 border-[var(--text-color)] border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-[var(--text-color-error)]">{error}</p>
			</div>
		);
	}

	if (teams.length < 2) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<div className="text-center">
					<p className="text-[var(--text-color-muted)] text-sm">
						Necesitas al menos 2 equipos
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-1 md:p-10">
			<div className="max-w-6xl mx-auto">
				{/* Grid de mesas */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{firstRound.map((match) => (
						<div
							key={match.mesa}
							className="relative bg-[var(--background-input)] rounded-2xl p-4 transition-colors"
						>
							{/* Número de mesa - esquina superior */}
							<div className="absolute top-4 right-4">
								<div
									className="w-10 h-10 rounded-full flex items-center justify-center
								bg-[var(--background)]
								shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.05)]
								dark:shadow-[4px_4px_8px_rgba(0,0,0,0.4),-4px_-4px_8px_rgba(255,255,255,0.02)]"
								>
									<span className="text-xs font-bold text-[var(--text-color-muted)]">
										{match.mesa}
									</span>
								</div>
							</div>

							{/* Pareja 1 */}
							<div className="mb-6">
								<div className="flex items-start gap-3">
									<div className="flex-1 space-y-2">
										<div className="space-y-1 pl-2 border-l-2 border-[var(--text-color-muted)] opacity-50">
											<p className="text-xs text-[var(--text-color-secondary)]">
												{match.pareja1.participants.participant1.name}
											</p>
											<p className="text-xs text-[var(--text-color-secondary)]">
												{match.pareja1.participants.participant2.name}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Separador VS */}
							<div className="flex items-center justify-center my-5">
								<div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--text-color-muted)] to-transparent opacity-30" />
								<span className="px-3 text-[10px] font-bold text-[var(--text-color-muted)] tracking-wider">
									VS
								</span>
								<div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--text-color-muted)] to-transparent opacity-30" />
							</div>

							{/* Pareja 2 */}
							<div>
								<div className="flex items-start gap-3">
									<div className="flex-1 space-y-2">
										<div className="space-y-1 pl-2 border-l-2 border-[var(--text-color-muted)] opacity-50">
											<p className="text-xs text-[var(--text-color-secondary)]">
												{match.pareja2.participants.participant1.name}
											</p>
											<p className="text-xs text-[var(--text-color-secondary)]">
												{match.pareja2.participants.participant2.name}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default TournamentBracket;

'use client';
import { useGrup } from '@/modules/sheets/usegrup';
import { useFirstRoundGenerator } from '@/modules/cuarenta/hooks/useFirstRoundGenerator';
import { useMemo, useState } from 'react';

interface BracketMatch {
	mesa: number;
	pareja1: {
		teamName: string;
		pagado: boolean;
		participants: { name: string }[];
	};
	pareja2?: {
		teamName: string;
		pagado: boolean;
		participants: { name: string }[];
	};
	winner?: 1 | 2; // Identificador del ganador
}

interface Round {
	name: string;
	matches: BracketMatch[];
}

function TournamentBracket() {
	const { teams, loading, error } = useGrup();
	const seed = 2831;
	const firstRound = useFirstRoundGenerator(teams, seed);

	// Estado para controlar los ganadores y el bracket completo
	const [bracketState, setBracketState] = useState<Round[]>([]);

	// Inicializar el bracket una sola vez
	useMemo(() => {
		if (firstRound.length === 0) {
			setBracketState([]);
			return;
		}

		const allRounds: Round[] = [];
		let currentMatches: BracketMatch[] = firstRound.map((match) => ({
			mesa: match.mesa,
			pareja1: {
				teamName: match.pareja1.teamName,
				pagado: match.pareja1.pagado,
				participants: [
					{ name: match.pareja1.participants.participant1.name },
					{ name: match.pareja1.participants.participant2.name },
				],
			},
			pareja2: match.pareja2
				? {
						teamName: match.pareja2.teamName,
						pagado: match.pareja2.pagado,
						participants: [
							{ name: match.pareja2.participants.participant1.name },
							{ name: match.pareja2.participants.participant2.name },
						],
					}
				: undefined,
			winner: undefined,
		}));

		let roundNumber = 1;
		while (currentMatches.length > 0) {
			const roundName =
				currentMatches.length === 1
					? 'FINAL'
					: currentMatches.length === 2
						? 'SEMIFINAL'
						: currentMatches.length === 4
							? 'CUARTOS'
							: `RONDA ${String(roundNumber)}`;

			allRounds.push({
				name: roundName,
				matches: currentMatches,
			});

			if (currentMatches.length === 1) break;

			const nextRoundMatches: BracketMatch[] = [];
			for (let i = 0; i < Math.ceil(currentMatches.length / 2); i++) {
				nextRoundMatches.push({
					mesa: i + 1,
					pareja1: {
						teamName: 'TBD',
						pagado: true,
						participants: [{ name: '???' }, { name: '???' }],
					},
					pareja2:
						i * 2 + 1 < currentMatches.length
							? {
									teamName: 'TBD',
									pagado: true,
									participants: [{ name: '???' }, { name: '???' }],
								}
							: undefined,
					winner: undefined,
				});
			}

			currentMatches = nextRoundMatches;
			roundNumber++;
		}

		setBracketState(allRounds);
	}, [firstRound]);

	// Función para marcar un ganador y avanzar al siguiente round
	const handleSelectWinner = (
		roundIndex: number,
		matchIndex: number,
		winner: 1 | 2
	) => {
		const newBracketState = JSON.parse(JSON.stringify(bracketState)) as Round[];

		// Marcar el ganador en el match actual
		newBracketState[roundIndex].matches[matchIndex].winner = winner;

		// Si no es la final, avanzar el ganador a la siguiente ronda
		if (roundIndex < newBracketState.length - 1) {
			const currentMatch = newBracketState[roundIndex].matches[matchIndex];
			const winningTeam =
				winner === 1 ? currentMatch.pareja1 : currentMatch.pareja2;

			// No debería pasar si la lógica es correcta, pero es una guarda de seguridad
			if (!winningTeam) return;

			// Determinar a qué match de la siguiente ronda debe ir
			const nextRoundMatchIndex = Math.floor(matchIndex / 2);
			const nextRoundMatch =
				newBracketState[roundIndex + 1].matches[nextRoundMatchIndex];

			// Determinar si va a pareja1 o pareja2 en el siguiente match
			if (matchIndex % 2 === 0) {
				// Va a pareja1
				nextRoundMatch.pareja1 = {
					teamName: winningTeam.teamName,
					pagado: winningTeam.pagado,
					participants: [...winningTeam.participants],
				};
			} else {
				// Va a pareja2
				nextRoundMatch.pareja2 = {
					teamName: winningTeam.teamName,
					pagado: winningTeam.pagado,
					participants: [...winningTeam.participants],
				};
			}
		}

		setBracketState(newBracketState);
	};

	// Función para resetear un match
	const handleResetMatch = (roundIndex: number, matchIndex: number) => {
		const newBracketState = JSON.parse(JSON.stringify(bracketState)) as Round[];

		// Resetear el ganador del match
		newBracketState[roundIndex].matches[matchIndex].winner = undefined;

		// Si no es la final, resetear también los matches siguientes
		if (roundIndex < newBracketState.length - 1) {
			const resetNextRounds = (rIndex: number, mIndex: number) => {
				if (rIndex >= newBracketState.length - 1) return;

				const nextRoundMatchIndex = Math.floor(mIndex / 2);
				const nextRoundMatch =
					newBracketState[rIndex + 1].matches[nextRoundMatchIndex];

				// Resetear la pareja correspondiente
				if (mIndex % 2 === 0) {
					nextRoundMatch.pareja1 = {
						teamName: 'TBD',
						pagado: true,
						participants: [{ name: '???' }, { name: '???' }],
					};
				} else {
					nextRoundMatch.pareja2 = {
						teamName: 'TBD',
						pagado: true,
						participants: [{ name: '???' }, { name: '???' }],
					};
				}

				// Resetear el ganador del siguiente match también
				nextRoundMatch.winner = undefined;

				// Recursivamente resetear los siguientes
				resetNextRounds(rIndex + 1, nextRoundMatchIndex);
			};

			resetNextRounds(roundIndex, matchIndex);
		}

		setBracketState(newBracketState);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="w-4 h-4 bg-(--text-color) animate-pulse" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background p-4">
				<div className="border-4 border-(--text-color-error) p-8">
					<p className="text-(--text-color-error) font-mono text-sm uppercase tracking-widest">
						ERROR: {error}
					</p>
				</div>
			</div>
		);
	}

	if (teams.length < 2) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background p-4">
				<div className="border-4 border-(--text-color) p-8">
					<p className="text-(--text-color) text-sm font-black uppercase tracking-wider">
						MÍNIMO 2 EQUIPOS REQUERIDOS
					</p>
				</div>
			</div>
		);
	}

	const MATCH_HEIGHT = 192;
	const MATCH_GAP = 16;

	return (
		<div className="min-h-screen bg-background p-4 md:p-8 overflow-x-auto">
			<div className="min-w-max mx-auto">
				{/* Header Brutalista */}
				<div className="mb-12 pb-6 border-b-4 border-(--text-color)">
					<h1 className="text-5xl md:text-7xl font-black text-(--text-color) uppercase tracking-tighter leading-none mb-4">
						CUADRANTE
						<br />
						TORNEO
					</h1>
					<div className="flex gap-3 text-xs font-mono uppercase tracking-widest">
						<span className="bg-(--text-color) text-background px-3 py-1.5 font-black">
							{teams.filter((t) => t.pagado).length} EQUIPOS
						</span>
						<span className="border-2 border-(--text-color-secondary) text-(--text-color-secondary) px-3 py-1.5">
							{bracketState.length} RONDAS
						</span>
					</div>
				</div>

				{/* Bracket Layout */}
				<div className="flex gap-20 items-center">
					{bracketState.map((round, roundIndex) => {
						// Calcular el offset para centrar verticalmente cada ronda
						const topOffset =
							roundIndex > 0
								? ((MATCH_HEIGHT + MATCH_GAP) * Math.pow(2, roundIndex - 1) -
										MATCH_HEIGHT) /
									2
								: 0;

						return (
							<div key={roundIndex} className="flex flex-col">
								{/* Round Label */}
								<div className="mb-8">
									<div className="border-2 border-(--text-color) px-4 py-2 inline-block">
										<span className="text-xs font-black text-(--text-color) uppercase tracking-widest">
											{round.name}
										</span>
									</div>
								</div>

								{/* Matches Container */}
								<div
									className="flex flex-col"
									style={{
										gap: `${String(MATCH_GAP)}px`,
										marginTop: roundIndex > 0 ? `${String(topOffset)}px` : '0',
									}}
								>
									{round.matches.map((match, matchIndex) => {
										// Calcular el espacio entre matches de esta ronda
										const spaceBetween =
											roundIndex > 0
												? (MATCH_HEIGHT + MATCH_GAP) * Math.pow(2, roundIndex) -
													MATCH_HEIGHT -
													MATCH_GAP
												: 0;

										return (
											<div
												key={matchIndex}
												style={{
													marginBottom:
														matchIndex < round.matches.length - 1 &&
														spaceBetween > 0
															? `${String(spaceBetween)}px`
															: '0',
												}}
											>
												<div
													className="w-64 border-4 border-(--text-color) bg-background relative"
													style={{
														transform:
															matchIndex % 2 === 0
																? 'rotate(-0.3deg)'
																: 'rotate(0.3deg)',
														height: `${String(MATCH_HEIGHT)}px`,
													}}
												>
													{/* Mesa Number */}
													<div className="absolute -top-3 -right-3 w-10 h-10 bg-(--text-color) flex items-center justify-center z-10 border-4 border-background">
														<span className="text-xl font-black text-background">
															{match.mesa}
														</span>
													</div>

													{/* Botón de Reset (solo si hay ganador) */}
													{match.winner && (
														<button
															onClick={() => {
																handleResetMatch(roundIndex, matchIndex);
															}}
															className="absolute -top-3 -left-3 w-8 h-8 bg-(--text-color-error) hover:bg-red-700 flex items-center justify-center z-10 border-4 border-background transition-colors"
															title="Resetear resultado"
														>
															<span className="text-sm font-black text-background">
																✕
															</span>
														</button>
													)}

													{/* Pareja 1 */}
													<button
														onClick={() => {
															if (
																match.pareja1.teamName !== 'TBD' &&
																!match.winner
															)
																handleSelectWinner(roundIndex, matchIndex, 1);
														}}
														disabled={
															match.pareja1.teamName === 'TBD' || !!match.winner
														}
														className={`w-full h-20 p-3 border-b-2 border-(--text-color-muted) relative overflow-hidden text-left transition-all group ${
															match.pareja1.teamName !== 'TBD' && !match.winner
																? 'hover:bg-(--text-color) cursor-pointer'
																: 'cursor-default'
														} ${
															match.winner === 1
																? 'bg-(--color) bg-opacity-20 border-4 border-(--color)'
																: ''
														}`}
													>
														<div className="absolute -left-1 top-0 text-5xl font-black text-(--text-color-muted) opacity-10">
															1
														</div>
														<div className="relative h-full flex flex-col justify-center">
															<div className="flex items-center justify-between mb-1">
																<h3 className="text-sm font-black text-(--text-color) uppercase tracking-tight break-all line-clamp-1 group-hover:text-background">
																	{match.pareja1.teamName}
																</h3>
																{match.winner === 1 && (
																	<div className="w-6 h-6 bg-(--color) flex items-center justify-center shrink-0 ml-2 border-2 border-background">
																		<span className="text-background text-sm font-black leading-none">
																			★
																		</span>
																	</div>
																)}
																{match.pareja1.pagado &&
																	match.pareja1.teamName !== 'TBD' && (
																		<div className="w-4 h-4 bg-(--color) flex items-center justify-center shrink-0 ml-2">
																			<span className="text-background text-xs font-black leading-none">
																				✓
																			</span>
																		</div>
																	)}
															</div>
															<div className="space-y-0.5 pl-2 border-l-2 border-(--text-color-muted)">
																{match.pareja1.participants.map((p, i) => (
																	<p
																		key={`${p.name}-${String(i)}`}
																		className="text-xs font-mono text-(--text-color-secondary) leading-tight"
																	>
																		{p.name}
																	</p>
																))}
															</div>
														</div>
													</button>

													{/* VS Separator */}
													{match.pareja2 && (
														<>
															<div className="h-8 flex items-center justify-center bg-(--text-color)">
																<span className="text-base font-black text-background tracking-widest">
																	VS
																</span>
															</div>

															{/* Pareja 2 */}
															<button
																onClick={() => {
																	if (
																		match.pareja2 &&
																		match.pareja2.teamName !== 'TBD' &&
																		!match.winner
																	)
																		handleSelectWinner(
																			roundIndex,
																			matchIndex,
																			2
																		);
																}}
																disabled={
																	match.pareja2.teamName === 'TBD' ||
																	!!match.winner
																}
																className={`w-full h-20 p-3 relative overflow-hidden text-left transition-all group ${
																	match.pareja2.teamName !== 'TBD' &&
																	!match.winner
																		? 'hover:bg-(--text-color) cursor-pointer'
																		: 'cursor-default'
																} ${
																	match.winner === 2
																		? 'bg-(--color) bg-opacity-20 border-4 border-(--color)'
																		: ''
																}`}
															>
																<div className="absolute -right-1 top-0 text-5xl font-black text-(--text-color-muted) opacity-10">
																	2
																</div>
																<div className="relative h-full flex flex-col justify-center">
																	<div className="flex items-center justify-between mb-1">
																		<h3 className="text-sm font-black text-(--text-color) uppercase tracking-tight break-all line-clamp-1 group-hover:text-background">
																			{match.pareja2.teamName}
																		</h3>
																		{match.winner === 2 && (
																			<div className="w-6 h-6 bg-(--color) flex items-center justify-center shrink-0 ml-2 border-2 border-background">
																				<span className="text-background text-sm font-black leading-none">
																					★
																				</span>
																			</div>
																		)}
																		{match.pareja2.pagado &&
																			match.pareja2.teamName !== 'TBD' && (
																				<div className="w-4 h-4 bg-(--color) flex items-center justify-center shrink-0 ml-2">
																					<span className="text-background text-xs font-black leading-none">
																						✓
																					</span>
																				</div>
																			)}
																	</div>
																	<div className="space-y-0.5 pl-2 border-l-2 border-(--text-color-muted)">
																		{match.pareja2.participants.map((p, i) => (
																			<p
																				key={`${p.name}-${String(i)}`}
																				className="text-xs font-mono text-(--text-color-secondary) leading-tight"
																			>
																				{p.name}
																			</p>
																		))}
																	</div>
																</div>
															</button>
														</>
													)}

													{/* Bye */}
													{!match.pareja2 && (
														<div className="h-28 flex items-center justify-center bg-(--color)">
															<span className="text-xs font-black text-background uppercase tracking-widest">
																AVANZA DIRECTO
															</span>
														</div>
													)}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				{/* Footer */}
				<div className="mt-16 pt-6 border-t-4 border-(--text-color)">
					<p className="text-xs font-mono text-(--text-color-muted) uppercase tracking-widest">
						CUARENTA TOURNAMENT / SISTEMA ELIMINACIÓN
					</p>
				</div>
			</div>
		</div>
	);
}

export default TournamentBracket;

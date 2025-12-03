'use client';
import { useEffect, useMemo, useState } from 'react';
import { useGrup } from '@/modules/sheets/usegrup';
import {
	useTournament,
	type BracketMatch,
} from '@/modules/cuarenta/hooks/useTournament';
import { WinnerDisplay } from '../../components/WinnerDisplay';

const TOURNAMENT_STORAGE_KEY = 'tournamentBracketState';
const WINNER_CELEBRATED_KEY = 'winnerCelebrated';

// ✅ CORRECCIÓN: Mover la configuración fuera del componente.
// Esto asegura que el array no se recree en cada render, evitando bucles infinitos.
const manualMatchesConfig = [
	{ team1Name: 'Bugs', team2Name: 'Citaaciegas' },
	// { team1Name: 'Equipo C', team2Name: 'Equipo D' },
];

function TournamentBracket() {
	const { teams, loading, error } = useGrup();
	const seed = 2831;

	const {
		bracketState,
		setBracketState,
		handleSelectWinner,
		handleResetMatch,
	} = useTournament(teams, seed, manualMatchesConfig);

	const [isWinnerModalOpen, setWinnerModalOpen] = useState(false);

	// Cargar estado desde localStorage al montar el componente
	useEffect(() => {
		const savedState = localStorage.getItem(TOURNAMENT_STORAGE_KEY);
		if (savedState) {
			setBracketState(JSON.parse(savedState));
		}
	}, [setBracketState, teams]); // Recargar si los equipos cambian

	// Guardar estado en localStorage cuando cambia
	useEffect(() => {
		if (bracketState.length > 0) {
			localStorage.setItem(
				TOURNAMENT_STORAGE_KEY,
				JSON.stringify(bracketState)
			);
		}
	}, [bracketState]);

	const finalWinner = useMemo(() => {
		if (bracketState.length === 0) return null;

		const finalRound = bracketState[bracketState.length - 1];
		if (finalRound.matches.length !== 1) return null;

		const finalMatch = finalRound.matches[0];
		if (!finalMatch.winner) return null;

		return finalMatch.winner === 1 ? finalMatch.pareja1 : finalMatch.pareja2;
	}, [bracketState]);

	// Efecto para mostrar el modal del ganador solo la primera vez
	useEffect(() => {
		const hasBeenCelebrated = sessionStorage.getItem(WINNER_CELEBRATED_KEY);
		if (finalWinner && !hasBeenCelebrated) {
			setWinnerModalOpen(true);
			sessionStorage.setItem(WINNER_CELEBRATED_KEY, 'true');
		}
	}, [finalWinner]);

	const handleCloseWinnerModal = () => {
		setWinnerModalOpen(false);
	};
	const handleFinalWinnerClick = () => {
		if (finalWinner) setWinnerModalOpen(true);
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

	const renderMatch = (
		match: BracketMatch,
		matchIndex: number,
		roundIndex: number,
		globalMatchIndex: number
	) => (
		<div
			className="w-64 border-4 border-(--text-color) bg-background relative"
			style={{
				transform: matchIndex % 2 === 0 ? 'rotate(-0.3deg)' : 'rotate(0.3deg)',
				height: `${MATCH_HEIGHT.toString()}px`, // ✅ CORRECCIÓN LÍNEA 122
			}}
		>
			{/* Mesa Number */}
			<div className="absolute -top-3 -right-3 w-10 h-10 bg-(--text-color) flex items-center justify-center z-10 border-4 border-background">
				<span className="text-xl font-black text-background">{match.mesa}</span>
			</div>

			{/* Botón de Reset - Solo si NO es BYE */}
			{match.winner && match.isBye !== true && (
				<button
					onClick={() => {
						handleResetMatch(roundIndex, globalMatchIndex);
					}}
					className="absolute -top-3 -left-3 w-8 h-8 bg-(--text-color-error) hover:bg-red-700 flex items-center justify-center z-10 border-4 border-background transition-colors"
					title="Resetear resultado"
				>
					<span className="text-sm font-black text-background">✕</span>
				</button>
			)}

			{/* Pareja 1 */}
			<button
				onClick={() => {
					if (match.winner) {
						handleFinalWinnerClick();
					} else {
						handleSelectWinner(roundIndex, globalMatchIndex, 1);
					}
				}}
				disabled={
					match.pareja1.teamName === 'TBD' ||
					(!!match.winner && roundIndex < bracketState.length - 1) ||
					match.isBye
				}
				className={`w-full h-20 p-3 border-b-2 border-(--text-color-muted) relative overflow-hidden text-left transition-all group ${
					match.pareja1.teamName !== 'TBD' && !match.winner && !match.isBye
						? 'hover:bg-(--text-color) hover:bg-opacity-5 cursor-pointer'
						: 'cursor-default'
				} ${match.winner === 1 ? 'bg-(--color) bg-opacity-20 border-4 border-(--color)' : ''}`}
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
						{match.pareja1.pagado && (
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
								key={`${p.name}-${i.toString()}`}
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
							if (match.winner) {
								handleFinalWinnerClick();
							} else {
								handleSelectWinner(roundIndex, globalMatchIndex, 2);
							}
						}}
						disabled={
							match.pareja2.teamName === 'TBD' ||
							(!!match.winner && roundIndex < bracketState.length - 1)
						}
						className={`w-full h-20 p-3 relative overflow-hidden text-left transition-all group ${
							match.pareja2.teamName !== 'TBD' && !match.winner && !match.isBye
								? 'hover:bg-(--text-color) cursor-pointer'
								: 'cursor-default '
						} ${match.winner === 2 ? 'bg-(--color) bg-opacity-20 border-4 border-(--color)' : ''}`}
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
								{match.pareja2.pagado && (
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
										key={`${p.name}-${i.toString()}`}
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
				<div className="h-28 flex items-center justify-center bg-(--color) bg-opacity-30">
					<span className="text-xs font-black text-(--text-color) uppercase tracking-widest">
						AVANZA DIRECTO
					</span>
				</div>
			)}
		</div>
	);

	// Dividir matches para ambos lados
	const halfMatchesCount = Math.ceil(bracketState[0]?.matches.length / 2) || 0;

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

				{/* Bracket Layout - Espejo */}
				<div className="flex justify-center gap-32">
					{/* Lado Izquierdo */}
					<div className="flex gap-20">
						{bracketState.map((round, roundIndex) => {
							const topOffset =
								roundIndex > 0
									? ((MATCH_HEIGHT + MATCH_GAP) * Math.pow(2, roundIndex - 1) -
											MATCH_HEIGHT) /
										2
									: 0;

							const leftMatches = round.matches.slice(
								0,
								halfMatchesCount / Math.pow(2, roundIndex)
							);

							if (leftMatches.length === 0) return null;

							return (
								<div
									key={`left-${roundIndex.toString()}`}
									className="flex flex-col"
								>
									<div className="mb-8">
										<div className="border-2 border-(--text-color) px-4 py-2 inline-block">
											<span className="text-xs font-black text-(--text-color) uppercase tracking-widest">
												{round.name}
											</span>
										</div>
									</div>

									<div
										className="flex flex-col"
										style={{
											gap: MATCH_GAP.toString(), // ✅ CORRECCIÓN LÍNEA 179
											marginTop: `${topOffset.toString()}px`, // ✅ CORRECCIÓN LÍNEA 179
										}}
									>
										{leftMatches.map((match, matchIndex) => {
											const spaceBetween =
												roundIndex > 0
													? (MATCH_HEIGHT + MATCH_GAP) *
															Math.pow(2, roundIndex) -
														MATCH_HEIGHT -
														MATCH_GAP
													: 0;

											return (
												<div
													key={matchIndex}
													style={{
														marginBottom:
															matchIndex < leftMatches.length - 1 &&
															spaceBetween > 0
																? `${spaceBetween.toString()}px`
																: '0',
													}}
												>
													{renderMatch(
														match,
														matchIndex,
														roundIndex,
														matchIndex
													)}
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>

					{/* Lado Derecho */}
					<div className="flex gap-20 flex-row-reverse">
						{bracketState.map((round, roundIndex) => {
							const topOffset =
								roundIndex > 0
									? ((MATCH_HEIGHT + MATCH_GAP) * Math.pow(2, roundIndex - 1) -
											MATCH_HEIGHT) /
										2
									: 0;

							const rightMatches = round.matches.slice(
								halfMatchesCount / Math.pow(2, roundIndex)
							);

							if (rightMatches.length === 0) return null;

							return (
								<div
									key={`right-${roundIndex.toString()}`}
									className="flex flex-col"
								>
									<div className="mb-8">
										<div className="border-2 border-(--text-color) px-4 py-2 inline-block">
											<span className="text-xs font-black text-(--text-color) uppercase tracking-widest">
												{round.name}
											</span>
										</div>
									</div>

									<div
										className="flex flex-col"
										style={{
											gap: MATCH_GAP.toString(), // ✅ CORRECCIÓN LÍNEA 261
											marginTop: `${topOffset.toString()}px`, // ✅ CORRECCIÓN LÍNEA 261
										}}
									>
										{rightMatches.map((match, matchIndex) => {
											const spaceBetween =
												roundIndex > 0
													? (MATCH_HEIGHT + MATCH_GAP) *
															Math.pow(2, roundIndex) -
														MATCH_HEIGHT -
														MATCH_GAP
													: 0;

											const globalMatchIndex =
												Math.floor(halfMatchesCount / Math.pow(2, roundIndex)) +
												matchIndex;

											return (
												<div
													key={matchIndex}
													style={{
														marginBottom:
															matchIndex < rightMatches.length - 1 &&
															spaceBetween > 0
																? `${spaceBetween.toString()}px` // ✅ CORRECCIÓN LÍNEA 332
																: '0',
													}}
												>
													{renderMatch(
														match,
														matchIndex,
														roundIndex,
														globalMatchIndex
													)}
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Footer */}
				<div className="mt-16 pt-6 border-t-4 border-(--text-color)">
					<p className="text-xs font-mono text-(--text-color-muted) uppercase tracking-widest">
						CUARENTA TOURNAMENT / SISTEMA ELIMINACIÓN
					</p>
				</div>

				{/* Modal del Ganador */}
				{finalWinner && isWinnerModalOpen && (
					<WinnerDisplay
						winnerTeam={finalWinner}
						onClose={handleCloseWinnerModal}
					/>
				)}
			</div>
		</div>
	);
}

export default TournamentBracket;

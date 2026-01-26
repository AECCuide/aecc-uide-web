import { useState, useEffect } from 'react';
import {
	useFirstRoundGenerator,
	ManualMatchConfig,
} from './useFirstRoundGenerator';
import type { TeamData } from '@/modules/sheets/usegrup';

export interface BracketMatch {
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
	winner?: 1 | 2;
	isBye?: boolean;
}

export interface Round {
	name: string;
	matches: BracketMatch[];
}

export const useTournament = (
	teams: TeamData[],
	seed: number,
	manualMatchesConfig: ManualMatchConfig[] = []
) => {
	const firstRound = useFirstRoundGenerator({
		teams,
		seed,
		manualMatchesConfig,
	});
	const [bracketState, setBracketState] = useState<Round[]>([]);

	// Inicializar el bracket
	useEffect(() => {
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
			isBye: !match.pareja2,
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
					isBye: i * 2 + 1 >= currentMatches.length,
				});
			}

			currentMatches = nextRoundMatches;
			roundNumber++;
		}

		setBracketState(allRounds);
	}, [firstRound]);

	// Auto-avanzar los BYEs
	useEffect(() => {
		if (bracketState.length === 0) return;

		// Encontrar el primer BYE que necesita ser avanzado
		let byeToAdvance = null;
		for (let r = 0; r < bracketState.length - 1; r++) {
			const round = bracketState[r];
			const matchIndex = round.matches.findIndex(
				(m) => m.isBye && m.winner === undefined && m.pareja1.teamName !== 'TBD'
			);

			if (matchIndex !== -1) {
				byeToAdvance = { roundIndex: r, matchIndex };
				break;
			}
		}

		// Si encontramos uno, lo procesamos y actualizamos el estado
		if (byeToAdvance) {
			const { roundIndex, matchIndex } = byeToAdvance;
			setBracketState((currentBracket) => {
				const newBracketState = JSON.parse(
					JSON.stringify(currentBracket)
				) as Round[];

				// ✅ CORRECCIÓN: Asegurarse de que la ronda actual y la siguiente existan.
				// Esto previene el error si el bracket aún no está completamente inicializado.
				if (!newBracketState[roundIndex] || !newBracketState[roundIndex + 1]) {
					return newBracketState;
				}

				const match = newBracketState[roundIndex].matches[matchIndex];
				match.winner = 1;

				const nextRoundMatchIndex = Math.floor(matchIndex / 2);
				const nextRoundMatch =
					newBracketState[roundIndex + 1].matches[nextRoundMatchIndex];

				if (matchIndex % 2 === 0) {
					nextRoundMatch.pareja1 = { ...match.pareja1 };
				} else {
					nextRoundMatch.pareja2 = { ...match.pareja1 };
				}
				return newBracketState;
			});
		}
	}, [bracketState]);

	const handleSelectWinner = (
		roundIndex: number,
		matchIndex: number,
		winner: 1 | 2
	) => {
		const newBracketState = JSON.parse(JSON.stringify(bracketState)) as Round[];
		const match = newBracketState[roundIndex].matches[matchIndex];

		match.winner = winner;

		if (roundIndex < newBracketState.length - 1) {
			const winningTeam = winner === 1 ? match.pareja1 : match.pareja2;
			if (!winningTeam) return;

			const nextRoundMatchIndex = Math.floor(matchIndex / 2);
			const nextRoundMatch =
				newBracketState[roundIndex + 1].matches[nextRoundMatchIndex];

			if (matchIndex % 2 === 0) {
				nextRoundMatch.pareja1 = { ...winningTeam };
			} else {
				nextRoundMatch.pareja2 = { ...winningTeam };
			}
		}

		setBracketState(newBracketState);
	};

	const handleResetMatch = (roundIndex: number, matchIndex: number) => {
		const newBracketState = JSON.parse(JSON.stringify(bracketState)) as Round[];
		const match = newBracketState[roundIndex].matches[matchIndex];

		if (match.isBye) return;

		const resetNextRounds = (rIndex: number, mIndex: number): void => {
			const currentMatch = newBracketState[rIndex].matches[mIndex];
			currentMatch.winner = undefined;

			if (rIndex >= newBracketState.length - 1) return;

			const nextRoundMatchIndex = Math.floor(mIndex / 2);
			const nextRoundMatch =
				newBracketState[rIndex + 1].matches[nextRoundMatchIndex];

			const placeholderTeam = {
				teamName: 'TBD',
				pagado: true,
				participants: [{ name: '???' }, { name: '???' }],
			};

			if (mIndex % 2 === 0) {
				nextRoundMatch.pareja1 = placeholderTeam;
			} else {
				nextRoundMatch.pareja2 = placeholderTeam;
			}

			// ✅ CORRECCIÓN: Verificar si winner está definido (no es undefined)
			if (nextRoundMatch.winner !== undefined) {
				resetNextRounds(rIndex + 1, nextRoundMatchIndex);
			}
		};

		resetNextRounds(roundIndex, matchIndex);
		setBracketState(newBracketState);
	};

	return {
		bracketState,
		setBracketState,
		handleSelectWinner,
		handleResetMatch,
	};
};

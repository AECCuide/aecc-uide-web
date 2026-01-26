import { useMemo } from 'react';
import { TeamData } from '@/modules/sheets/usegrup';

// Interfaz para definir un enfrentamiento manual por nombre de equipo
export interface ManualMatchConfig {
	team1Name: string;
	team2Name: string;
}

export interface Match {
	mesa: number;
	pareja1: TeamData;
	pareja2?: TeamData; // La pareja 2 es opcional para manejar byes
}

export const useFirstRoundGenerator = ({
	teams,
	seed,
	manualMatchesConfig = [],
}: {
	teams: TeamData[];
	seed: number;
	manualMatchesConfig?: ManualMatchConfig[];
}): Match[] => {
	const firstRound = useMemo(() => {
		// Generador de números pseudoaleatorios (PRNG) simple usando una semilla.
		const createSeededRandom = (s: number) => {
			let state = s;
			return () => {
				// LCG (Linear Congruential Generator) con parámetros comunes
				state = (state * 1664525 + 1013904223) % 2 ** 32;
				return state / 2 ** 32;
			};
		};

		const seededRandom = createSeededRandom(seed);

		// 1. Filtra solo los equipos que han pagado.
		const paidTeams = teams.filter((team) => team.pagado);

		if (paidTeams.length === 0) return [];

		const teamsMapByName = new Map<string, TeamData>(
			paidTeams.map((team) => [team.teamName, team])
		);
		const usedTeamNames = new Set<string>();
		const allMatches: Match[] = [];

		// 2. Procesar los enfrentamientos manuales
		manualMatchesConfig.forEach((manualMatch) => {
			const team1 = teamsMapByName.get(manualMatch.team1Name);
			const team2 = teamsMapByName.get(manualMatch.team2Name);

			// Solo crea el match si ambos equipos existen, pagaron y no han sido usados
			if (
				team1 &&
				team2 &&
				!usedTeamNames.has(team1.teamName) &&
				!usedTeamNames.has(team2.teamName)
			) {
				allMatches.push({
					mesa: 0, // Se asignará después
					pareja1: team1,
					pareja2: team2,
				});
				usedTeamNames.add(team1.teamName);
				usedTeamNames.add(team2.teamName);
			}
		});

		// 3. Obtener los equipos restantes y barajarlos
		const remainingTeams = paidTeams.filter(
			(team) => !usedTeamNames.has(team.teamName)
		);
		const shuffledRemainingTeams = [...remainingTeams].sort(
			() => seededRandom() - 0.5
		);

		// 4. Crear los enfrentamientos aleatorios con los equipos restantes
		for (let i = 0; i < shuffledRemainingTeams.length; i += 2) {
			if (i + 1 < shuffledRemainingTeams.length) {
				// Caso normal: hay dos equipos para emparejar
				allMatches.push({
					mesa: 0, // Se asignará después
					pareja1: shuffledRemainingTeams[i],
					pareja2: shuffledRemainingTeams[i + 1],
				});
			} else {
				// Caso impar: el último equipo obtiene un pase (bye)
				allMatches.push({
					mesa: 0, // Se asignará después
					pareja1: shuffledRemainingTeams[i],
				});
			}
		}

		// 5. Asignar números de mesa a todos los enfrentamientos
		return allMatches.map((match, index) => ({ ...match, mesa: index + 1 }));
	}, [teams, seed, manualMatchesConfig]);

	return firstRound;
};

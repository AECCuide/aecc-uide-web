import { useMemo } from 'react';
import { TeamData } from '@/modules/sheets/usegrup';

export interface Match {
	mesa: number;
	pareja1: TeamData;
	pareja2?: TeamData; // La pareja 2 es opcional para manejar byes
}

export const useFirstRoundGenerator = (
	teams: TeamData[],
	seed: number
): Match[] => {
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

		// Filtra solo los equipos que han pagado.
		const paidTeams = teams.filter((team) => team.pagado);

		if (paidTeams.length === 0) return [];

		// Baraja los equipos de forma aleatoria usando la semilla
		const shuffledTeams = [...paidTeams].sort(() => seededRandom() - 0.5);

		const matches: Match[] = [];
		let mesaCounter = 1;

		// Crea las parejas de 2 en 2 a partir de la lista barajada
		for (let i = 0; i < shuffledTeams.length; i += 2) {
			if (i + 1 < shuffledTeams.length) {
				// Caso normal: hay dos equipos para emparejar
				matches.push({
					mesa: mesaCounter++,
					pareja1: shuffledTeams[i],
					pareja2: shuffledTeams[i + 1],
				});
			} else {
				// Caso impar: el último equipo obtiene un pase (bye)
				matches.push({
					mesa: mesaCounter++,
					pareja1: shuffledTeams[i],
				});
			}
		}

		return matches;
	}, [teams, seed]);

	return firstRound;
};

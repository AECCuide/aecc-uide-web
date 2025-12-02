import { useMemo } from 'react';
import { TeamData } from '@/modules/sheets/usegrup';

export interface Match {
	mesa: number;
	pareja1: TeamData;
	pareja2: TeamData;
}

export const useFirstRoundGenerator = (teams: TeamData[]): Match[] => {
	const firstRound = useMemo(() => {
		// Filtra solo los equipos que han pagado.
		const paidTeams = teams.filter((team) => team.pagado);

		if (paidTeams.length < 2) return [];

		// Baraja los equipos de forma aleatoria
		const shuffledTeams = [...paidTeams].sort(() => Math.random() - 0.5);

		const matches: Match[] = [];
		let mesaCounter = 1;

		// Crea las parejas de 2 en 2 a partir de la lista barajada
		for (let i = 0; i < shuffledTeams.length; i += 2) {
			if (i + 1 < shuffledTeams.length) {
				matches.push({
					mesa: mesaCounter++,
					pareja1: shuffledTeams[i],
					pareja2: shuffledTeams[i + 1],
				});
			}
		}

		return matches;
	}, [teams]);

	return firstRound;
};

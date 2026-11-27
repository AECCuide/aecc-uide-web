import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { TOURNAMENT } from '@/modules/cuarenta/config/tournament';
import CuarentaPage from '@/modules/cuarenta/page';

export const metadata: Metadata = buildMetadata({
	title: TOURNAMENT.name,
	description: `${TOURNAMENT.name} de la AECC UIDE, ${TOURNAMENT.dateLabel}. Juego en parejas: ${TOURNAMENT.teamsPerTable.toString()} parejas por partida, ${TOURNAMENT.playersPerTable.toString()} jugadores y una baraja por mesa.`,
	path: '/cuarenta',
	image: '/og-cuarenta.png',
	imageAlt: `${TOURNAMENT.name} · ${TOURNAMENT.dateLabel}`,
});

export default function Cuarenta() {
	return <CuarentaPage />;
}

import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { SHIFTS, TOURNAMENT } from '@/modules/cuarenta/config/tournament';
import TeamRegistration from '@/modules/cuarenta/page/forms';

export const metadata: Metadata = buildMetadata({
	title: 'Registro de parejas',
	description: `Inscribe tu pareja al ${TOURNAMENT.name} del ${TOURNAMENT.dateLabel}. Elige turno: ${SHIFTS.map(
		(shift) => `${shift.label} ${shift.time}`
	).join(
		' o '
	)}. Se juega en parejas, ${TOURNAMENT.playersPerTable.toString()} jugadores por mesa.`,
	path: '/cuarenta/forms',
	image: '/og-cuarenta.png',
	imageAlt: `${TOURNAMENT.name} · ${TOURNAMENT.dateLabel}`,
});

export default function CuarentaForms() {
	return <TeamRegistration />;
}

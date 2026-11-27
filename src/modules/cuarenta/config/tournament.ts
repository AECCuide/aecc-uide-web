/**
 * Configuracion central del torneo de Cuarenta.
 *
 * Todo lo editable del evento vive aqui: fecha, turnos y horas. Cambiar una
 * hora o un texto en este archivo lo actualiza en el formulario, en el armado
 * de mesas y en el control de partidas, sin tocar ningun componente.
 */

export type ShiftId = 'manana' | 'tarde';

export interface Shift {
	id: ShiftId;
	/** Nombre visible del turno. */
	label: string;
	/** Hora visible. Texto libre: admite rangos como '2:30 PM / 3:00 PM'. */
	time: string;
}

export const TOURNAMENT = {
	name: 'Torneo de Cuarenta',
	/** Fecha del evento en ISO, para ordenar y comparar. */
	date: '2026-12-08',
	/** Fecha como se muestra al usuario. */
	dateLabel: '8 de diciembre',
	/** El Cuarenta se juega en parejas: 2 parejas por mesa, 4 jugadores. */
	teamsPerTable: 2,
	playersPerTable: 4,
	/** Cada mesa necesita una baraja. */
	decksPerTable: 1,
} as const;

export const SHIFTS: Shift[] = [
	{ id: 'manana', label: 'Turno Mañana', time: '10:00 AM' },
	{ id: 'tarde', label: 'Turno Tarde', time: '2:30 PM / 3:00 PM' },
];

export const SHIFT_IDS: [ShiftId, ...ShiftId[]] = ['manana', 'tarde'];

export function getShift(id: ShiftId): Shift {
	const shift = SHIFTS.find((candidate) => candidate.id === id);
	if (!shift) {
		throw new Error(`Turno desconocido: ${id}`);
	}
	return shift;
}

/** Etiqueta completa, p. ej. 'Turno Mañana (10:00 AM)'. */
export function shiftLabel(id: ShiftId): string {
	const shift = getShift(id);
	return `${shift.label} (${shift.time})`;
}

export function isShiftId(value: unknown): value is ShiftId {
	return value === 'manana' || value === 'tarde';
}

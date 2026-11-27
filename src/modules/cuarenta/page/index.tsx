'use client';

import Link from 'next/link';
import { EventCard3D } from '@/components/cuarenta/EventCard3D';
import { SHIFTS, TOURNAMENT } from '@/modules/cuarenta/config/tournament';

/**
 * Portada del torneo de Cuarenta.
 *
 * Composicion minimalista alrededor de una sola carta: titulares serif en
 * esquinas opuestas, una marca de agua detras, los datos del evento en las
 * otras dos esquinas y dos barras finas arriba y abajo. Los colores salen de
 * las variables de la pagina, asi que el modo claro y el oscuro funcionan sin
 * reglas aparte.
 */

const DISPLAY = 'font-[family-name:var(--font-display)]';
const HAIRLINE = 'text-[0.62rem] uppercase tracking-[0.22em]';

export default function CuarentaPage() {
	return (
		// El layout raiz envuelve las paginas en un div con mt-10, asi que
		// min-h-screen dejaria 2.5rem de scroll de mas.
		<div className="relative flex min-h-[calc(100svh-2.5rem)] flex-col overflow-hidden bg-background text-(--text-color)">
			{/* ---------- Barra superior ---------- */}
			<header
				className={`flex items-center justify-between border-b border-(--text-color)/15 px-5 py-3 ${HAIRLINE}`}
			>
				<span className="text-(--text-color-secondary)">Menú</span>
				<span className={`${DISPLAY} tracking-[0.3em] normal-case`}>
					Cuarenta
				</span>
				<Link
					href="/cuarenta/forms"
					className="text-(--text-color-secondary) transition-colors hover:text-(--text-color)"
				>
					Inscripción
				</Link>
			</header>

			{/* ---------- Escena ---------- */}
			<main className="relative flex flex-1 items-center justify-center">
				{/* Marca de agua. Decorativa: fuera del arbol de accesibilidad. */}
				<span
					aria-hidden="true"
					className={`${DISPLAY} pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(4.5rem,18vw,16rem)] leading-none text-(--text-color)/[0.07]`}
				>
					CUARENTA
				</span>

				{/* Titular principal, arriba a la izquierda. */}
				<h1
					className={`${DISPLAY} pointer-events-none absolute left-5 top-3 max-w-[52%] text-[clamp(1.9rem,6.4vw,4.75rem)] uppercase leading-[0.92] tracking-tight sm:top-6`}
				>
					Torneo de
					<br />
					Cuarenta
				</h1>

				{/* Fecha, abajo a la derecha. */}
				<p
					className={`${DISPLAY} pointer-events-none absolute bottom-3 right-5 text-right text-[clamp(1.5rem,5.4vw,4rem)] uppercase leading-[0.92] tracking-tight sm:bottom-6`}
				>
					8 de diciembre
				</p>

				{/* Horarios, arriba a la derecha. */}
				<div className="pointer-events-none absolute right-5 top-[4.5rem] hidden text-right text-sm leading-relaxed md:block">
					<p className={`${HAIRLINE} text-(--text-color-secondary)`}>
						Horarios · {TOURNAMENT.dateLabel}
					</p>
					{SHIFTS.map((shift) => (
						<p key={shift.id} className="mt-1">
							{shift.label}: {shift.time}
						</p>
					))}
				</div>

				{/* Modalidad, abajo a la izquierda. */}
				<div className="pointer-events-none absolute bottom-5 left-5 hidden max-w-[27rem] text-sm leading-relaxed md:block">
					<p>
						<span className={`${HAIRLINE} text-(--text-color-secondary)`}>
							Modalidad:
						</span>{' '}
						Juego en parejas (2 personas por equipo)
					</p>
					<p>
						{TOURNAMENT.teamsPerTable} parejas por partida ·{' '}
						{TOURNAMENT.playersPerTable} jugadores por mesa
					</p>
					<p>{TOURNAMENT.decksPerTable} baraja de cartas asignada por mesa</p>
				</div>

				<EventCard3D />
			</main>

			{/* ---------- Barra inferior ---------- */}
			<footer
				className={`flex items-center justify-between border-t border-(--text-color)/15 px-5 py-3 ${HAIRLINE}`}
			>
				<Link
					href="/cuarenta/groups"
					className="text-(--text-color-secondary) transition-colors hover:text-(--text-color)"
				>
					Ver equipos
				</Link>
				<Link
					href="/cuarenta/forms"
					className="rounded-full bg-(--text-color) px-5 py-2.5 text-(--background) transition-opacity hover:opacity-85"
				>
					Registrar pareja
				</Link>
			</footer>
		</div>
	);
}

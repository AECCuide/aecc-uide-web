'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SHIFTS, TOURNAMENT } from '@/modules/cuarenta/config/tournament';
import { AceOfCoins } from './AceOfCoins';
import { Bastos, Copas, Espadas, Oros } from './spanishSuits';

/**
 * Carta del torneo como objeto 3D.
 *
 * Se construye con transformaciones 3D de CSS en vez de WebGL: el texto se
 * mantiene vectorial y nitido, hereda las variables de color de la pagina y no
 * hay que abrir un contexto WebGL para una sola carta.
 *
 * La cara sin informacion descansa inclinada, como un modelo 3D en un
 * visor, y se puede girar arrastrando. Al pasar al reverso, que si lleva
 * texto, la carta se endereza para que se pueda leer de frente.
 */

/** Inclinacion en reposo de la cara ilustrada, en grados. */
const REST_TILT = { x: 9, y: -24 };
/** Grosor de la carta en px. Da el canto visible al girarla. */
const DEPTH = 8;
/** Pixeles de arrastre a partir de los cuales deja de contar como clic. */
const DRAG_THRESHOLD = 6;

const CARD_BG = '#121212';
const EDGE_BG = '#2e2b24';
const GOLD = 'rgb(255, 212, 42)';

export function EventCard3D() {
	const cardRef = useRef<HTMLButtonElement>(null);
	const glossRef = useRef<HTMLDivElement>(null);
	const rotation = useRef({ ...REST_TILT });
	const drag = useRef({ active: false, moved: 0, x: 0, y: 0, rx: 0, ry: 0 });
	// Un arrastre termina en un evento click; esto evita que ademas voltee.
	const suppressClick = useRef(false);

	const [flipped, setFlipped] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	const render = useCallback((withTransition: boolean) => {
		const card = cardRef.current;
		if (!card) return;
		const { x, y } = rotation.current;

		card.style.transition = withTransition
			? 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)'
			: 'none';
		card.style.transform = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;

		// El brillo se desplaza con el giro, como la luz sobre el barniz.
		if (glossRef.current) {
			const shift = 50 + Math.max(-60, Math.min(60, y)) * 0.85;
			const stop = (offset: number) => (shift + offset).toString();
			glossRef.current.style.background = `linear-gradient(102deg, transparent ${stop(
				-30
			)}%, rgb(255 255 255 / 0.05) ${stop(-12)}%, rgb(255 255 255 / 0.2) ${stop(
				0
			)}%, rgb(255 255 255 / 0.05) ${stop(12)}%, transparent ${stop(30)}%)`;
		}
	}, []);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => {
			setReducedMotion(query.matches);
		};
		sync();
		query.addEventListener('change', sync);
		return () => {
			query.removeEventListener('change', sync);
		};
	}, []);

	// Al mostrar el reverso la carta se endereza: ahi hay texto que leer.
	// Al volver al frente retoma la inclinacion de reposo.
	useEffect(() => {
		rotation.current = flipped ? { x: 0, y: 180 } : { ...REST_TILT };
		render(true);
	}, [flipped, render]);

	const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		drag.current = {
			active: true,
			moved: 0,
			x: event.clientX,
			y: event.clientY,
			rx: rotation.current.x,
			ry: rotation.current.y,
		};
	};

	const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
		if (!drag.current.active) return;
		const dx = event.clientX - drag.current.x;
		const dy = event.clientY - drag.current.y;
		drag.current.moved = Math.max(drag.current.moved, Math.hypot(dx, dy));

		rotation.current = {
			// Se limita la vertical para que la carta no quede de canto.
			x: Math.max(-55, Math.min(55, drag.current.rx - dy * 0.35)),
			y: drag.current.ry + dx * 0.45,
		};
		render(false);
	};

	const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
		if (!drag.current.active) return;
		drag.current.active = false;
		event.currentTarget.releasePointerCapture(event.pointerId);
		suppressClick.current = drag.current.moved >= DRAG_THRESHOLD;
	};

	// Voltear vive en onClick y no en pointerup, asi Enter y Espacio funcionan
	// solos por ser un <button> de verdad.
	const handleClick = () => {
		if (suppressClick.current) {
			suppressClick.current = false;
			return;
		}
		setFlipped((value) => !value);
	};

	const faceClass =
		'absolute inset-0 rounded-[14px] [backface-visibility:hidden] overflow-hidden';

	return (
		<div className="relative flex items-center justify-center px-6 py-10 [perspective:1500px]">
			{/* Indicador de interaccion, como en la referencia. */}
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -right-14 top-[6%] hidden h-24 w-24 lg:-right-20 md:block"
			>
				<svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
					<title>Click and drag</title>
					<defs>
						<path
							id="badge-arc"
							d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
							fill="none"
						/>
					</defs>
					<text
						fill="currentColor"
						className="text-[11px] uppercase tracking-[0.3em] opacity-60"
					>
						{/* textLength reparte la frase por toda la circunferencia:
						    sin esto la repeticion se corta a media palabra. */}
						<textPath href="#badge-arc" textLength="226" lengthAdjust="spacing">
							CLICK AND DRAG ·
						</textPath>
					</text>
				</svg>
			</span>

			{/* El drop-shadow va en el contenedor: un `filter` sobre el mismo
			    elemento que lleva preserve-3d aplana el contexto 3D y anula
			    backface-visibility. */}
			<div
				className={reducedMotion ? undefined : 'animate-card-float'}
				style={{ filter: 'drop-shadow(0 38px 46px rgb(0 0 0 / 0.5))' }}
			>
				<button
					ref={cardRef}
					type="button"
					aria-label={
						flipped
							? 'Ver la cara ilustrada de la carta'
							: 'Ver los datos del torneo al reverso de la carta'
					}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onClick={handleClick}
					className="relative block h-[clamp(320px,47vw,430px)] w-[clamp(218px,32vw,292px)] cursor-grab touch-none rounded-[14px] active:cursor-grabbing [transform-style:preserve-3d] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-(--text-color-icon)"
				>
					{/* ---------- Canto: le da grosor real ---------- */}
					<div
						aria-hidden="true"
						className="absolute inset-y-[6px] right-0 rounded-r-[14px]"
						style={{
							width: `${DEPTH.toString()}px`,
							background: EDGE_BG,
							transformOrigin: 'right center',
							transform: `translateZ(${(-DEPTH / 2).toString()}px) rotateY(90deg)`,
						}}
					/>
					<div
						aria-hidden="true"
						className="absolute inset-x-[6px] bottom-0"
						style={{
							height: `${DEPTH.toString()}px`,
							background: EDGE_BG,
							transformOrigin: 'center bottom',
							// rotateX(90deg) manda la tira hacia -z, asi que el
							// desplazamiento previo va POSITIVO para que el canto
							// quede entre las dos caras y no detras del reverso.
							transform: `translateZ(${(DEPTH / 2).toString()}px) rotateX(90deg)`,
						}}
					/>

					{/* ---------- Cara ilustrada ---------- */}
					<div
						className={faceClass}
						style={{
							color: GOLD,
							transform: `translateZ(${(DEPTH / 2).toString()}px)`,
							// Fondo en capas: un realce radial que simula la luz
							// sobre el centro, y un tramado finisimo que le da
							// grano de carton en vez de negro plano.
							backgroundColor: CARD_BG,
							backgroundImage: [
								'radial-gradient(120% 80% at 50% 28%, rgb(255 255 255 / 0.09), transparent 62%)',
								'repeating-linear-gradient(45deg, rgb(255 255 255 / 0.022) 0 1px, transparent 1px 3px)',
								'repeating-linear-gradient(-45deg, rgb(0 0 0 / 0.05) 0 1px, transparent 1px 3px)',
							].join(','),
							boxShadow:
								'inset 0 1px 0 rgb(255 255 255 / 0.14), inset 0 -1px 0 rgb(0 0 0 / 0.5)',
						}}
					>
						<div className="absolute inset-[7px] rounded-[9px] border border-current/30" />
						<div className="absolute inset-[11px] rounded-[7px] border border-current/15" />

						<span className="absolute left-4 top-3 text-left leading-none">
							<span className="block font-[family-name:var(--font-display)] text-[2rem] leading-none">
								A
							</span>
							<Oros className="mt-1.5 h-4 w-4" />
						</span>

						<span className="absolute bottom-3 right-4 rotate-180 text-left leading-none">
							<span className="block font-[family-name:var(--font-display)] text-[2rem] leading-none">
								A
							</span>
							<Oros className="mt-1.5 h-4 w-4" />
						</span>

						<AceOfCoins className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2" />

						<span className="absolute inset-x-0 bottom-[14%] text-center font-[family-name:var(--font-display)] text-[0.65rem] uppercase tracking-[0.4em] opacity-70">
							Cuarenta
						</span>

						{/* Barniz: se mueve con el giro. */}
						<div
							ref={glossRef}
							aria-hidden="true"
							className="pointer-events-none absolute inset-0"
						/>
					</div>

					{/* ---------- Reverso: los datos ---------- */}
					<div
						className={faceClass}
						style={{
							color: '#f0f0f0',
							transform: `translateZ(${(-DEPTH / 2).toString()}px) rotateY(180deg)`,
							backgroundColor: CARD_BG,
							backgroundImage:
								'radial-gradient(120% 80% at 50% 20%, rgb(255 255 255 / 0.07), transparent 60%),repeating-linear-gradient(45deg, rgb(255 255 255 / 0.022) 0 1px, transparent 1px 3px)',
							boxShadow:
								'inset 0 1px 0 rgb(255 255 255 / 0.12), inset 0 -1px 0 rgb(0 0 0 / 0.5)',
						}}
					>
						<div
							className="absolute inset-[7px] rounded-[9px] border"
							style={{ borderColor: 'rgb(255 212 42 / 0.3)' }}
						/>

						<div className="flex h-full flex-col justify-between p-6 text-left">
							<div>
								<p className="text-[0.55rem] uppercase tracking-[0.3em] text-(--text-color-icon)">
									AECC UIDE
								</p>
								<p className="mt-3 font-[family-name:var(--font-display)] text-[1.6rem] leading-tight">
									{TOURNAMENT.name}
								</p>
								<p className="mt-1 text-xs text-white/55">
									{TOURNAMENT.dateLabel}
								</p>
							</div>

							<dl className="space-y-3">
								{SHIFTS.map((shift) => (
									<div key={shift.id}>
										<dt className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">
											{shift.label}
										</dt>
										<dd className="text-sm text-(--text-color-icon)">
											{shift.time}
										</dd>
									</div>
								))}
							</dl>

							<div>
								<span className="flex gap-3.5 text-(--text-color-icon)/70">
									<Oros className="h-3.5 w-3.5" />
									<Copas className="h-3.5 w-3.5" />
									<Espadas className="h-3.5 w-3.5" />
									<Bastos className="h-3.5 w-3.5" />
								</span>
								<p className="mt-2.5 text-[0.55rem] uppercase tracking-[0.2em] text-white/35">
									Baraja española · {TOURNAMENT.playersPerTable} jugadores por
									mesa
								</p>
							</div>
						</div>
					</div>
				</button>
			</div>
		</div>
	);
}

export default EventCard3D;

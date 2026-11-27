/**
 * Palos de la baraja española, dibujados como SVG propios.
 *
 * El Cuarenta se juega con baraja española de 40 cartas: oros, copas, espadas
 * y bastos, con valores 1 a 7 mas sota, caballo y rey. No hay 8, 9 ni 10.
 *
 * Todos heredan el color del texto con `currentColor`, asi que siguen la
 * identidad de la pagina y el modo oscuro sin configuracion extra.
 */

export type SuitId = 'oros' | 'copas' | 'espadas' | 'bastos';

interface SuitProps {
	className?: string;
}

export function Oros({ className }: SuitProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			fill="none"
			className={className}
			aria-hidden="true"
		>
			<circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="5" />
			<circle cx="50" cy="50" r="27" stroke="currentColor" strokeWidth="3" />
			<circle cx="50" cy="50" r="11" fill="currentColor" />
			{[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
				<line
					key={angle}
					x1="50"
					y1="19"
					x2="50"
					y2="27"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					transform={`rotate(${angle.toString()} 50 50)`}
				/>
			))}
		</svg>
	);
}

export function Copas({ className }: SuitProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			fill="none"
			className={className}
			aria-hidden="true"
		>
			<path
				d="M26 20h48v12c0 13-11 23-24 23S26 45 26 32V20Z"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinejoin="round"
			/>
			<path
				d="M50 55v22"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinecap="round"
			/>
			<path
				d="M32 84c0-5 8-8 18-8s18 3 18 8"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinecap="round"
			/>
			<circle cx="50" cy="30" r="6" fill="currentColor" />
		</svg>
	);
}

export function Espadas({ className }: SuitProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			fill="none"
			className={className}
			aria-hidden="true"
		>
			<path
				d="M50 12 58 30v34H42V30L50 12Z"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinejoin="round"
			/>
			<path
				d="M26 64h48"
				stroke="currentColor"
				strokeWidth="6"
				strokeLinecap="round"
			/>
			<path
				d="M50 64v18"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinecap="round"
			/>
			<circle cx="50" cy="86" r="6" stroke="currentColor" strokeWidth="4" />
		</svg>
	);
}

export function Bastos({ className }: SuitProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			fill="none"
			className={className}
			aria-hidden="true"
		>
			<path
				d="M34 84 70 24"
				stroke="currentColor"
				strokeWidth="9"
				strokeLinecap="round"
			/>
			<path
				d="M58 22 74 32"
				stroke="currentColor"
				strokeWidth="7"
				strokeLinecap="round"
			/>
			<path
				d="M48 44 62 53"
				stroke="currentColor"
				strokeWidth="6"
				strokeLinecap="round"
			/>
			<path
				d="M38 62 51 70"
				stroke="currentColor"
				strokeWidth="6"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export const SUITS: { id: SuitId; label: string; Icon: typeof Oros }[] = [
	{ id: 'oros', label: 'Oros', Icon: Oros },
	{ id: 'copas', label: 'Copas', Icon: Copas },
	{ id: 'espadas', label: 'Espadas', Icon: Espadas },
	{ id: 'bastos', label: 'Bastos', Icon: Bastos },
];

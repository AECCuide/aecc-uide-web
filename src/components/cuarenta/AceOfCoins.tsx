/**
 * As de oros ornamentado, dibujado a mano en SVG.
 *
 * El as de oros de la baraja española es tradicionalmente la carta mas
 * decorada del mazo. Esta es una interpretacion propia: anillos concentricos,
 * corona de rayos y una roseta central. Hereda el color con `currentColor`.
 */

const TICKS = Array.from({ length: 36 }, (_, i) => i * 10);
const RAYS = Array.from({ length: 16 }, (_, i) => i * 22.5);
const PETALS = Array.from({ length: 8 }, (_, i) => i * 45);

export function AceOfCoins({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 200 200"
			fill="none"
			className={className}
			aria-hidden="true"
		>
			{/* Anillo exterior con dentado fino */}
			<circle
				cx="100"
				cy="100"
				r="94"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="3" />
			{TICKS.map((angle) => (
				<line
					key={`tick-${angle.toString()}`}
					x1="100"
					y1="88"
					x2="100"
					y2="94"
					stroke="currentColor"
					strokeWidth="1.6"
					transform={`rotate(${angle.toString()} 100 100)`}
				/>
			))}

			{/* Corona de rayos */}
			<circle
				cx="100"
				cy="100"
				r="74"
				stroke="currentColor"
				strokeWidth="1.2"
			/>
			{RAYS.map((angle) => (
				<path
					key={`ray-${angle.toString()}`}
					d="M100 26 L104 48 L100 54 L96 48 Z"
					fill="currentColor"
					opacity="0.85"
					transform={`rotate(${angle.toString()} 100 100)`}
				/>
			))}

			{/* Anillo medio */}
			<circle
				cx="100"
				cy="100"
				r="54"
				stroke="currentColor"
				strokeWidth="2.5"
			/>
			<circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="1" />

			{/* Roseta central */}
			{PETALS.map((angle) => (
				<ellipse
					key={`petal-${angle.toString()}`}
					cx="100"
					cy="76"
					rx="9"
					ry="20"
					stroke="currentColor"
					strokeWidth="1.6"
					transform={`rotate(${angle.toString()} 100 100)`}
				/>
			))}

			<circle
				cx="100"
				cy="100"
				r="20"
				stroke="currentColor"
				strokeWidth="2.5"
			/>
			<circle cx="100" cy="100" r="13" stroke="currentColor" strokeWidth="1" />
			<circle cx="100" cy="100" r="6" fill="currentColor" />

			{/* Florones en las diagonales */}
			{[45, 135, 225, 315].map((angle) => (
				<path
					key={`flourish-${angle.toString()}`}
					d="M100 60 q7 8 0 16 q-7 -8 0 -16"
					fill="currentColor"
					opacity="0.6"
					transform={`rotate(${angle.toString()} 100 100)`}
				/>
			))}
		</svg>
	);
}

export default AceOfCoins;

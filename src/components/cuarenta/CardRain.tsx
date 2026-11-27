'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// La escena se carga solo en el cliente: WebGL no existe en el servidor, y
// asi el bundle de three no entra en el render inicial de la pagina.
const CardRainScene = dynamic(() => import('./CardRainScene'), { ssr: false });

/** Menos cartas en pantallas chicas, donde el GPU suele ser mas modesto. */
function cardCountFor(width: number): number {
	if (width < 640) return 28;
	if (width < 1024) return 48;
	return 72;
}

interface CardRainProps {
	className?: string;
	/** Opacidad del lienzo. Bajala si el contenido encima pierde contraste. */
	opacity?: number;
}

export function CardRain({ className, opacity = 1 }: CardRainProps) {
	const [count, setCount] = useState<number | null>(null);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		const syncPaused = () => {
			// Se congela si el usuario pidio menos movimiento, o si la pestaña
			// no esta visible: animar algo que nadie ve solo gasta bateria.
			setPaused(motionQuery.matches || document.visibilityState === 'hidden');
		};

		const syncCount = () => {
			setCount(cardCountFor(window.innerWidth));
		};

		syncPaused();
		syncCount();

		motionQuery.addEventListener('change', syncPaused);
		document.addEventListener('visibilitychange', syncPaused);
		window.addEventListener('resize', syncCount);

		return () => {
			motionQuery.removeEventListener('change', syncPaused);
			document.removeEventListener('visibilitychange', syncPaused);
			window.removeEventListener('resize', syncCount);
		};
	}, []);

	// Hasta saber el ancho no se monta nada, para no crear el contexto WebGL
	// dos veces con distinta cantidad de cartas.
	if (count === null) return null;

	return (
		<div
			// Decorativa: fuera del arbol de accesibilidad y sin capturar clics,
			// para que no se interponga con formularios ni botones.
			aria-hidden="true"
			className={cn(
				'pointer-events-none fixed inset-0 -z-10 select-none',
				className
			)}
			style={{ opacity }}
		>
			<CardRainScene count={count} paused={paused} />
		</div>
	);
}

export default CardRain;

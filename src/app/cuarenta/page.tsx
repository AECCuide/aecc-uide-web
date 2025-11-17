'use client';

import FallingCardsAnimation from '@/components/cuarenta/animation/animacionCartas';

export default function CuarentaPage() {
	return (
		<FallingCardsAnimation cardCount={120}>
			<div className="text-center text-white">
				<section>
					<h1>Cartas Cayendo</h1>
					<p>Desplázate hacia abajo para ver la magia ✨</p>
				</section>
				<section>
					<h2>Continúa scrolleando</h2>
				</section>
				<section>
					<h2>¡Fin del viaje!</h2>
				</section>
			</div>
		</FallingCardsAnimation>
	);
}

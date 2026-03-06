'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { type BracketMatch } from '@/modules/cuarenta/hooks/useTournament';

interface WinnerDisplayProps {
	winnerTeam: NonNullable<BracketMatch['pareja1']>;
	onClose: () => void;
}

export function WinnerDisplay({ winnerTeam, onClose }: WinnerDisplayProps) {
	useEffect(() => {
		const emojis = ['🃏', '♠️', '♥️', '♦️', '♣️', '🏆'];
		const emojiShapes = emojis.map((emoji) =>
			confetti.shapeFromText({ text: emoji, scalar: 3 })
		);

		const duration = 15 * 1000;
		const animationEnd = Date.now() + duration;

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min;

		const interval = setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				clearInterval(interval);
				return;
			}

			const particleCount = 50 * (timeLeft / duration);
			void confetti({
				startVelocity: 30,
				spread: 360,
				ticks: 60,
				zIndex: 1000,
				particleCount,
				origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
				shapes: emojiShapes,
				scalar: 2,
			});
		}, 250);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<button
			type="button"
			className="fixed inset-0 w-full h-full bg-background/95 flex items-center justify-center z-50 cursor-pointer border-none outline-none"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="text-center space-y-8 cursor-default">
				{/* Nombre del equipo ganador */}
				<h2 className="text-6xl md:text-8xl font-black text-(--text-color) uppercase tracking-tighter">
					{winnerTeam.teamName}
				</h2>

				{/* Participantes */}
				<div className="space-y-2">
					{winnerTeam.participants.map((participant) => (
						<p
							key={participant.name}
							className="text-xl md:text-2xl font-mono text-(--text-color-secondary) tracking-wide"
						>
							{participant.name}
						</p>
					))}
				</div>

				{/* Indicador sutil para cerrar */}
				<p className="text-xs font-mono text-(--text-color-muted) uppercase tracking-widest mt-12">
					CLICK PARA CERRAR
				</p>
			</div>
		</button>
	);
}

'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
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

		const duration = 15 * 1000; // Duración de la animación en milisegundos
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
			// Lanza confeti desde dos puntos en la parte superior
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
		<div
			className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm cursor-pointer"
			onClick={onClose}
		>
			<div
				className="bg-background border border-stone-200 dark:border-zinc-700 rounded-3xl p-8 text-center relative shadow-2xl max-w-md w-full animate-fade-in-up cursor-default"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-(--text-color-muted) hover:text-(--text-color) transition-colors"
					title="Cerrar"
				>
					<X className="w-6 h-6" />
				</button>

				<div className="mb-4">
					<span className="text-2xl font-bold text-(--text-color) tracking-tight">
						¡GANADORES!
					</span>
				</div>

				<div className="mb-8">
					<h2 className="text-4xl md:text-5xl font-bold text-(--text-color) tracking-tighter break-word">
						{winnerTeam.teamName}
					</h2>
				</div>

				<div className="space-y-2">
					{winnerTeam.participants.map((participant, index) => (
						<p key={index} className="text-lg text-(--text-color-secondary)">
							{participant.name}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}

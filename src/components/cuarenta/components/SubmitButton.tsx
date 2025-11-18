'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface SubmitButtonProps {
	validateForm: () => boolean;
	getRegistrationData: () => object;
	children: React.ReactNode;
}

export default function SubmitButton({
	validateForm,
	getRegistrationData,
	children,
}: SubmitButtonProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const triggerConfetti = () => {
		const defaults = {
			spread: 360,
			ticks: 100,
			gravity: 0,
			decay: 0.94,
			startVelocity: 30,
			origin: { x: 0.5, y: 0.5 },
		};

		// 1. Disparo de formas geométricas (Esto ya funcionaba)
		confetti({
			...defaults,
			particleCount: 30,
			scalar: 1.2,
			shapes: ['circle', 'square'],
			colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#F7DC6F'],
		});

		// 2. Disparo de Emojis
		const emojis = ['🃏', '♠️', '♥️', '♦️', '♣️', ' 🎉', '🎊', '✨'];

		// Convertimos cada emoji en una "forma" de canvas
		const emojiShapes = emojis.map((emoji) =>
			confetti.shapeFromText({ text: emoji, scalar: 3 })
		);

		confetti({
			...defaults,
			particleCount: 25, // Cantidad de emojis
			scalar: 3, // Tamaño de los emojis
			shapes: emojiShapes, // Pasamos las formas creadas arriba
		});
	};

	const handleSubmit = () => {
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		if (!validateForm()) {
			setIsSubmitting(false);
			return;
		}

		const registrationData = getRegistrationData();

		console.log(JSON.stringify(registrationData, null, 2));

		localStorage.setItem(
			'lastRegistration',
			JSON.stringify(registrationData, null, 2)
		);

		// Disparamos el confeti
		triggerConfetti();
		setTimeout(triggerConfetti, 100);
		setTimeout(triggerConfetti, 200);

		// Reactivar el botón después de la animación
		setTimeout(() => {
			setIsSubmitting(false);
		}, 1000); // 1 segundo para que la animación se complete
	};

	return (
		<div className="pt-6 pb-8 relative">
			<button
				onClick={handleSubmit}
				className="w-full py-4 bg-white text-stone-900 rounded-2xl font-medium hover:bg-stone-100 transition-colors shadow-lg transform active:scale-95 duration-150 disabled:bg-stone-400 disabled:cursor-not-allowed"
				disabled={isSubmitting}
			>
				{children}
			</button>
		</div>
	);
}

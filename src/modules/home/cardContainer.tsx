// components/CardContainer.tsx
import React, { useState, useEffect, useRef } from 'react';
import Card from '@/components/ui/card';

// Definir interfaces para el tipado
interface CardData {
	image?: string;
	badge?: string;
	provider?: string;
	title?: string;
	description?: string;
	tags?: string[];
}

interface CardContainerProps {
	cardsData: CardData[];
}

// Componente contenedor con carrusel infinito horizontal
const CardContainer: React.FC<CardContainerProps> = ({ cardsData }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visibleCards, setVisibleCards] = useState<CardData[]>([]);

	// Cargar todos los productos al inicio
	useEffect(() => {
		if (cardsData.length > 0) {
			setVisibleCards(cardsData); // Cargar todos los datos
		}
	}, [cardsData]);

	// Efecto para el carrusel infinito
	useEffect(() => {
		const container = containerRef.current;
		const handleScroll = () => {
			if (container) {
				// Si el usuario llega al final del scroll, reiniciar la posición
				if (
					container.scrollLeft + container.clientWidth >=
					container.scrollWidth
				) {
					container.scrollTo({ left: 0, behavior: 'instant' }); // Reiniciar al inicio
				}
			}
		};
		if (container) {
			container.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	return (
		<div className="w-full overflow-x-auto" ref={containerRef}>
			<div className="flex gap-4">
				{visibleCards.map((cardData, index) => (
					<div key={`card-${index}`} className="flex-shrink-0">
						<Card cardData={cardData} />
					</div>
				))}
				{/* Repetir las tarjetas para el efecto infinito */}
				{visibleCards.map((cardData, index) => (
					<div key={`card-${index}-clone`} className="flex-shrink-0">
						<Card cardData={cardData} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CardContainer;

// components/CardContainer.tsx
import React, { useState, useEffect } from 'react';
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

// Componente contenedor con scroll horizontal normal
const CardContainer: React.FC<CardContainerProps> = ({ cardsData }) => {
	const [visibleCards, setVisibleCards] = useState<CardData[]>([]);

	// Cargar todos los productos al inicio
	useEffect(() => {
		if (cardsData.length > 0) {
			setVisibleCards(cardsData); // Cargar todos los datos
		}
	}, [cardsData]);

	return (
		<div className="w-full overflow-x-auto">
			<div className="flex gap-4 pb-4">
				{visibleCards.map((cardData, index) => (
					<div key={`card-${index}`} className="flex-shrink-0">
						<Card cardData={cardData} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CardContainer;

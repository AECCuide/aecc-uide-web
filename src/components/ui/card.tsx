import React from 'react';

// Definir interfaces para el tipado
interface Tag {
	[key: string]: string;
}

interface CardData {
	image?: string;
	badge?: string;
	provider?: string;
	title?: string;
	description?: string;
	tags?: string[];
}

interface CardProps {
	cardData: CardData;
}

interface CardContainerProps {
	cardsData: CardData[];
}

// Componente Card que recibe props para el contenido dinámico
const Card: React.FC<CardProps> = ({ cardData }) => {
	// Desestructuración de los datos del JSON
	const { image, badge, provider, title, description, tags } = cardData;

	return (
		<div className="max-w-xs overflow-hidden">
			{/* Image visualization */}
			<div className="relative bg-gray-800 rounded-lg">
				<img
					src={image || '/api/placeholder/300/120'}
					alt={title || 'Network visualization'}
					className="w-full h-32 object-cover"
				/>
				{/* Badge overlay - solo se muestra si hay un badge */}
				{badge && (
					<div className="absolute top-4 left-4">
						<span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md font-semibold tracking-wide">
							{badge}
						</span>
					</div>
				)}
			</div>
			{/* Text content */}
			<div className="py-3">
				<div className="text-gray-400 text-sm mb-1">
					{provider || 'provider'}
				</div>
				<h3 className="text-xl font-bold mb-2">{title || 'Title'}</h3>
				<p className="text-gray-400 text-sm mb-4">
					{description || 'Description goes here'}
				</p>
				{/* Tags dinámicos */}
				<div className="flex gap-2 mb-4 flex-wrap">
					{tags &&
						tags.map((tag, index) => (
							<span
								key={index}
								className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
							>
								{tag}
							</span>
						))}
				</div>
			</div>
		</div>
	);
};

// Componente contenedor que puede mostrar múltiples cards desde un JSON
const CardContainer: React.FC<CardContainerProps> = ({ cardsData }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{cardsData.map((cardData, index) => (
				<Card key={index} cardData={cardData} />
			))}
		</div>
	);
};

// Exportación de ambos componentes
export { Card, CardContainer };

// También exportamos CardContainer como default para facilitar su importación
export default CardContainer;

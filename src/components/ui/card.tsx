// components/ui/Card.tsx
import React from 'react';
import Image, { StaticImageData } from 'next/image';

// Definir interfaz para los datos de la tarjeta
export interface CardData {
	image?: string | StaticImageData;
	badge?: string;
	provider?: string;
	title?: string;
	description?: string;
	tags?: string[];
	slug?: string;
}

interface CardProps {
	cardData: CardData | CardData[];
	onClick?: (card: CardData) => void;
}

const Card: React.FC<CardProps> = ({ cardData, onClick }) => {
	// Si es un array, renderizamos una lista de cards
	if (Array.isArray(cardData)) {
		return (
			<div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-hide">
				{cardData.map((item, index) => {
					return (
						// biome-ignore lint/a11y/noStaticElementInteractions: dynamic role
						<div
							key={item.slug ?? index}
							className={`snap-center flex-none ${onClick ? 'cursor-pointer' : ''}`}
							onClick={() => onClick?.(item)}
							onKeyDown={(e) => {
								if (onClick && (e.key === 'Enter' || e.key === ' ')) {
									e.preventDefault();
									onClick(item);
								}
							}}
							role={onClick ? 'button' : undefined}
							tabIndex={onClick ? 0 : undefined}
						>
							<Card cardData={item} onClick={onClick} />
						</div>
					);
				})}
			</div>
		);
	}

	// Desestructuración de los datos del JSON
	const { image, badge, provider, title, description, tags } = cardData;

	// Número máximo de tags a mostrar
	const maxVisibleTags = 3;
	const visibleTags = tags ? tags.slice(0, maxVisibleTags) : [];
	const hiddenTagsCount =
		tags && tags.length > maxVisibleTags ? tags.length - maxVisibleTags : 0;

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: dynamic role
		<div
			className={`w-80 ${onClick ? 'cursor-pointer transition-transform hover:scale-[1.02]' : ''}`}
			onClick={() => onClick?.(cardData as CardData)}
			onKeyDown={(e) => {
				if (onClick && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					onClick(cardData as CardData);
				}
			}}
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : undefined}
		>
			{/* Image visualization */}
			<div className="relative bg-(--color-card) rounded-3xl overflow-hidden">
				{/* Contenedor de la imagen ajustado */}
				<div className="w-full h-32 relative">
					<Image
						src={image ?? '/api/placeholder/300/120'}
						alt={title ?? 'Network visualization'}
						fill
						className="object-cover"
					/>
				</div>

				{/* Badge overlay - solo se muestra si hay un badge */}
				{badge && (
					<div className="absolute top-4 left-4">
						<span className="bg-(--color-sidebar-primary) text-(--text-color) text-xs px-3 py-1 rounded-md font-semibold tracking-wide">
							{badge}
						</span>
					</div>
				)}
			</div>

			{/* Text content */}
			<div className="py-3">
				{provider && (
					<div className="text-(--color-muted-foreground) text-sm mb-1">
						{provider}
					</div>
				)}
				<h3 className="text-xl font-bold mb-2 text-(--color-foreground)">
					{title ?? 'Title'}
				</h3>
				<p className="text-(--color-muted-foreground) text-sm mb-4">
					{description ?? 'Description goes here'}
				</p>

				{/* Tags dinámicos con límite y contador */}
				<div className="flex gap-1 mb-4 flex-wrap">
					{visibleTags.map((tag, index) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: tags array order is static and can contain duplicate strings
							key={`${tag}-${index}`}
							className="bg-(--color-accent) text-(--color-accent-foreground) px-2 py-1 rounded-full text-xs"
						>
							{tag}
						</span>
					))}
					{hiddenTagsCount > 0 && (
						<span className="bg-(--color-accent) text-(--color-accent-foreground) px-2 py-1 rounded-full text-xs">
							+{hiddenTagsCount}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;

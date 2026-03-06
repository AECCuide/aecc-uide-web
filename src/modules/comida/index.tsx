// src/modules/comida/index.tsx
'use client';

import { useState } from 'react';
import CardContainer from '@/components/ui/card';
import { CategoryMenu } from './components/category';
import { SearchBar } from './components/searchBar'; // Importación del nuevo componente
import {
	cafeteriasData,
	restaurantsData,
	categories,
	snacksData,
} from './hooks/useEts';

export default function ComidaModule() {
	const [searchQuery, setSearchQuery] = useState('');
	const [activeCategory, setActiveCategory] = useState<string>('Comida');

	const filterData = <
		T extends { title: string; description: string; tags?: string[] },
	>(
		data: T[],
		isTienda: boolean = false
	) => {
		let filtered = data;

		// Filtro por categoría
		if (activeCategory && activeCategory !== 'Comida') {
			if (activeCategory === 'Tiendas') {
				filtered = isTienda ? data : [];
			} else {
				const lowerCat = activeCategory.toLowerCase();
				filtered = filtered.filter(
					(item) =>
						item.tags?.some((tag) => tag.toLowerCase() === lowerCat) ||
						(activeCategory === 'Café' &&
							item.tags?.some((tag) => tag.toLowerCase() === 'cafe'))
				);
			}
		}

		// Filtro por búsqueda de texto
		if (searchQuery) {
			const lowerQuery = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(lowerQuery) ||
					item.description.toLowerCase().includes(lowerQuery) ||
					item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
			);
		}

		return filtered;
	};

	const filteredCafeterias = filterData(cafeteriasData);
	const filteredRestaurants = filterData(restaurantsData);
	const filteredSnacks = filterData(snacksData, true);

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<div className="flex justify-center px-6 md:px-16 lg:px-20 pt-10 pb-4">
				<div className="w-full max-w-2xl">
					<SearchBar onSearch={setSearchQuery} />
				</div>
			</div>

			<nav className="w-full">
				<CategoryMenu
					items={categories}
					activeCategory={activeCategory}
					onSelectCategory={setActiveCategory}
				/>
			</nav>

			<div className="flex-1 px-6 md:px-16 lg:px-20 py-8">
				{filteredCafeterias.length > 0 && (
					<section className="mb-10">
						<h2 className="title-h1 mb-6">Cafeterías</h2>
						<CardContainer cardData={filteredCafeterias} />
					</section>
				)}

				{filteredRestaurants.length > 0 && (
					<section className="mb-10">
						<h2 className="title-h1 mb-6">Restaurantes</h2>
						<CardContainer cardData={filteredRestaurants} />
					</section>
				)}

				{filteredSnacks.length > 0 && (
					<section className="mb-10">
						<h2 className="title-h1 mb-6">Tiendas</h2>
						<CardContainer cardData={filteredSnacks} />
					</section>
				)}

				{filteredCafeterias.length === 0 &&
					filteredRestaurants.length === 0 &&
					filteredSnacks.length === 0 && (
						<div className="text-center text-muted-foreground py-10">
							No se encontraron resultados para "{searchQuery}"{' '}
							{activeCategory !== 'Comida' &&
								`en la categoría ${activeCategory}`}
						</div>
					)}

				<hr className="opacity-10" style={{ borderColor: 'var(--border)' }} />
			</div>
		</div>
	);
}

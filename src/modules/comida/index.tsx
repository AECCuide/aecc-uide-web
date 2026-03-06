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

	const filterData = <
		T extends { title: string; description: string; tags?: string[] },
	>(
		data: T[]
	) => {
		if (!searchQuery) return data;
		const lowerQuery = searchQuery.toLowerCase();
		return data.filter(
			(item) =>
				item.title.toLowerCase().includes(lowerQuery) ||
				item.description.toLowerCase().includes(lowerQuery) ||
				item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
		);
	};

	const filteredCafeterias = filterData(cafeteriasData);
	const filteredRestaurants = filterData(restaurantsData);
	const filteredSnacks = filterData(snacksData);

	return (
		<div className="min-h-screen flex flex-col bg-background">
			<div className="flex justify-center px-6 md:px-16 lg:px-20 pt-10 pb-4">
				<div className="w-full max-w-2xl">
					<SearchBar onSearch={setSearchQuery} />
				</div>
			</div>

			<nav className="w-full">
				<CategoryMenu items={categories} />
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
							No se encontraron resultados para "{searchQuery}"
						</div>
					)}

				<hr className="opacity-10" style={{ borderColor: 'var(--border)' }} />
			</div>
		</div>
	);
}

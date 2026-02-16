// src/modules/comida/index.tsx
'use client';

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
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<div className="flex justify-center px-6 md:px-16 lg:px-20 pt-10 pb-4">
				<div className="w-full max-w-2xl">
					<SearchBar />
				</div>
			</div>

			<nav className="w-full">
				<CategoryMenu items={categories} />
			</nav>

			<div className="flex-1 px-6 md:px-16 lg:px-20 py-8">
				<section className="mb-10">
					<h2 className="title-h1 mb-6">Cafeterías</h2>
					<CardContainer cardData={cafeteriasData} />
				</section>

				<section className="mb-10">
					<h2 className="title-h1 mb-6">Restaurantes</h2>
					<CardContainer cardData={restaurantsData} />
				</section>

				<section className="mb-10">
					<h2 className="title-h1 mb-6">Tiendas</h2>
					<CardContainer cardData={snacksData} />
				</section>

				<hr className="opacity-10" style={{ borderColor: 'var(--border)' }} />
			</div>
		</div>
	);
}

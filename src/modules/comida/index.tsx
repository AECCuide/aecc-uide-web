// app/page.tsx
'use client';

import CardContainer from '@/modules/comida/components/cardEats';
import { cafeteriasData, restaurantsData } from './hooks/useEts';

export default function Eats() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="pt-15 px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
				<div>
					<div className="mb-3">
						<h1 className="title-h1">Cafeterías</h1>
					</div>
					<CardContainer cardsData={cafeteriasData} />
				</div>
			</div>

			<div>
				<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
					<div className="mb-3">
						<h1 className="title-h1">Restaurantes</h1>
					</div>
					<CardContainer cardsData={restaurantsData} />
				</div>

				<hr
					className="mx-8 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-20 my-20"
					style={{ borderColor: 'var(--border)' }}
				/>
			</div>
		</div>
	);
}

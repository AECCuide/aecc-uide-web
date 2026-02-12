// app/page.tsx
'use client';

import CardContainer from '@/modules/comida/components/cardEats';

const cardsData = [
	{
		image:
			'https://www.uide.edu.ec/wp-content/uploads/2023/02/PIEDRA-NEGRA1.jpg',
		badge: '$2 - $20',
		title: 'Piedra Negra',
		description: 'Marcelo Fernández • Horario 8:00- 16:00.',
		tags: ['Café', 'Barato', 'Café', 'Sanduches'],
		slug: 'Piedra Negra',
	},
	{
		image: 'https://www.uide.edu.ec/wp-content/uploads/2023/02/COLLEGE-1.jpg',
		badge: '$0.20 - $50',
		title: 'College Store',
		description: 'Biblioteca • Horario 7:30- 18:00',
		tags: ['Saludable', 'Snacks', 'Ensaladas', 'Bowl'],
		slug: 'College Store',
	},
	{
		image:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq_-CmbnEimj7zL-aHGW68X58jMQqZBTU7uA&s',
		badge: '$1.50 - $5',
		title: 'Happy Coffe',
		description: 'Coliseo • Horario 9:00-14:00)',
		tags: ['Café', 'Postres'],
		slug: 'Happy Coffe',
	},
];

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="py-15 px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
				<div className="mb-3">
					<h1 className="title-h1">Comida</h1>
				</div>
				<CardContainer cardsData={cardsData} />
			</div>

			<hr
				className="mx-8 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-20 my-20"
				style={{ borderColor: 'var(--border)' }}
			/>
		</div>
	);
}

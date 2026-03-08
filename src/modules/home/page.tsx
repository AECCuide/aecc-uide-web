// app/page.tsx
'use client';
import Logo from './components/aeccIcon.tsx';
import CardContainer from './components/cardContainer.tsx';
import EventsCalendar from './components/eventsCalendar';

const cardsData = [
	{
		image:
			'https://i.pinimg.com/736x/94/e4/5d/94e45d12c714cd677f6d1d89f44b0b46.jpg',
		badge: 'Fiestas de Quito',
		provider: 'Anual Event',
		title: 'Cuarenta',
		description:
			'Por fiestas de quito se organiza el evento de Cuarenta para la Escuela de Ciencias de la Computación.',
		tags: ['Event', 'Cuarenta', 'Fiestas de quito', 'AECC', 'UIDE'],
		slug: 'cuarenta',
	},
	{
		image: 'https://advertise.ieee.org/ieee-og.png',
		badge: 'IEEE',
		provider: 'IEEE',
		title: 'IEEE',
		description:
			'IEEE es la asociación técnica profesional más grande del mundo dedicada a fomentar la innovación y la excelencia en beneficio de la humanidad.',
		tags: ['Event', 'IEEE', 'IEEE Day', 'AECC', 'UIDE'],
		slug: 'ieee',
	},

	// Puedes añadir más objetos para crear más tarjetas
];

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex justify-center">
				<Logo className="w-50 h-70 sm:w-100 sm:h-100 md:w-100 md:h-100 lg:w-140 lg:h-140" />
			</div>

			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
				<div className="mb-3">
					<h1 className="title-h1">Eventos</h1>
				</div>
				<CardContainer cardsData={cardsData} />
			</div>

			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20 mt-12">
				<h2 className="title-h1 m-0">Calendario</h2>
				<EventsCalendar />
			</div>

			<hr
				className="mx-8 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-20 my-20"
				style={{ borderColor: 'var(--border)' }}
			/>
		</div>
	);
}

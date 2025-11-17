// app/page.tsx
'use client';
import Logo from './components/aeccIcon.tsx';
import CardContainer from './components/cardContainer.tsx';

const cardsData = [
	{
		image:
			'https://i.pinimg.com/736x/83/70/f6/8370f63ff294a7582c596621c28a6de8.jpg',
		badge: 'RUN ANYWHERE',
		provider: 'deepseek-ai',
		title: 'deepseek-r1',
		description:
			'State-of-the-art, high-efficiency LLM excelling in reasoning, math, and coding.',
		tags: ['math', 'advanced reasoning', 'chat'],
		slug: 'ceramic-vase',
	},
	{
		image:
			'https://i.pinimg.com/736x/88/98/65/889865e2df8b49c05875c62cf9c5670f.jpg',
		badge: 'NEW',
		provider: 'anthropic',
		title: 'claude-3',
		description: 'Advanced language model with strong reasoning capabilities.',
		tags: ['reasoning', 'chat', 'document analysis', 'reasoning', 'reasoning'],
		slug: 'ceramic-vase',
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
					<h1 className="title-h1">Titulo </h1>
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

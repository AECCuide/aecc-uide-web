// app/page.tsx
'use client';
import { useTheme } from 'next-themes';
import Logo from './icon/aeccIcon';
import CardContainer from './cardContainer.tsx';
import { YearlyTimeline } from './TimeLine/yearlyTimeLine.tsx';

const cardsData = [
	{
		image: '/api/placeholder/300/120',
		badge: 'RUN ANYWHERE',
		provider: 'deepseek-ai',
		title: 'deepseek-r1',
		description:
			'State-of-the-art, high-efficiency LLM excelling in reasoning, math, and coding.',
		tags: ['math', 'advanced reasoning', 'chat'],
		url: 'https://www.deepseek-ai.com/deepseek-r1',
	},
	{
		image: '/api/placeholder/300/120',
		badge: 'NEW',
		provider: 'anthropic',
		title: 'claude-3',
		description: 'Advanced language model with strong reasoning capabilities.',
		tags: ['reasoning', 'chat', 'document analysis', 'reasoning', 'reasoning'],
		url: 'https://www.anthropic.com/claude-3',
	},

	// Puedes añadir más objetos para crear más tarjetas
];

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex justify-center">
				<Logo className="w-50 h-100 sm:w-100 sm:h-100 md:w-100 md:h-100 lg:w-180 lg:h-180" />
			</div>
			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
				<div className="mb-3">
					<h1 className="title-h1">Titulo </h1>
					<p>Texto generico de saludo</p>
				</div>
				<CardContainer cardsData={cardsData} />
			</div>

			<div className="px-8 sm:px-8 md:px-16 lg:px-20 xl:px-20">
				{/* Línea divisoria */}
				<hr className="my-4" style={{ borderColor: 'var(--border)' }} />
				<div className="mb-3">
					<h1 className="title-h1">Titulo</h1>
					<p>Texto generico de saludo</p>
				</div>
				<YearlyTimeline />
			</div>
		</div>
	);
}

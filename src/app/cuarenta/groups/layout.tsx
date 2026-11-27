'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

type View = 'Inscritos' | 'Primera ronda' | 'Podios';

const TAB_BASE_CLASS =
	'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200';
const TAB_ACTIVE_CLASS = 'bg-background text-foreground shadow';
const TAB_INACTIVE_CLASS = 'text-muted-foreground hover:bg-background/50';

// useSearchParams() exige un limite de Suspense por encima: durante el
// prerender los parametros de la URL todavia no se conocen. Por eso la barra
// de pestanas vive en su propio componente.
function ViewTabs() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const activeView = (searchParams.get('view') ?? 'Inscritos') as View;

	const handleViewChange = (view: View) => {
		const params = new URLSearchParams(searchParams);
		params.set('view', view);
		router.push(`${pathname}?${params.toString()}`);
	};

	const tabClass = (view: View) =>
		`${TAB_BASE_CLASS} ${
			activeView === view ? TAB_ACTIVE_CLASS : TAB_INACTIVE_CLASS
		}`;

	return (
		<>
			<button
				type="button"
				id="inscritos-btn"
				onClick={() => {
					handleViewChange('Inscritos');
				}}
				className={tabClass('Inscritos')}
			>
				Inscritos
			</button>
			<button
				type="button"
				id="primera-ronda-btn"
				onClick={() => {
					handleViewChange('Primera ronda');
				}}
				className={tabClass('Primera ronda')}
			>
				Primera Ronda
			</button>
			<button
				type="button"
				id="podios-btn"
				onClick={() => {
					handleViewChange('Podios');
				}}
				className={tabClass('Podios')}
			>
				Podios
			</button>
		</>
	);
}

// Ocupa el mismo espacio que las pestanas reales, para que no salte el layout.
function ViewTabsFallback() {
	return (
		<>
			{['Inscritos', 'Primera Ronda', 'Podios'].map((label) => (
				<span key={label} className={`${TAB_BASE_CLASS} ${TAB_INACTIVE_CLASS}`}>
					{label}
				</span>
			))}
		</>
	);
}

export default function GroupsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center">Equipos Inscritos</h1>
			<div className="flex justify-center my-8">
				<div className="flex space-x-2 bg-muted p-1 rounded-xl">
					<Suspense fallback={<ViewTabsFallback />}>
						<ViewTabs />
					</Suspense>
				</div>
			</div>
			<hr className="mb-8 border-t border-border" />
			{/* La pagina hija tambien usa useSearchParams(). */}
			<Suspense fallback={null}>{children}</Suspense>
		</div>
	);
}

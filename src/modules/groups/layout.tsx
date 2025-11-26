import React from 'react';

export default function GroupsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center mb-8">Equipos Inscritos</h1>
			{children}
		</div>
	);
}

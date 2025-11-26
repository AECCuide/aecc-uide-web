import React from 'react';

export default function GroupsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center">Equipos Inscritos</h1>
			<hr className="mt-8 md:mt-20 mb-8 border-t border-gray-600" />
			{children}
		</div>
	);
}

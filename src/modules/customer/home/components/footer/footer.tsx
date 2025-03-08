'use client';

import React, { JSX } from 'react';
import { useTheme } from 'next-themes';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export interface Social {
	icon: JSX.Element;
	href: string;
}
export interface Authors {
	id: number;
	perfilGithub: string;
	name: string;
	href: string;
}

export interface FooterData {
	title: string;
	titleFollow: string;
	authors: Authors[];
	socials: Social[];
}

const footerData: FooterData = {
	title: 'Autores',
	authors: [
		{
			id: 1,
			perfilGithub: 'https://avatars.githubusercontent.com/u/155678368?v=4',
			name: 'Auca',
			href: 'https://github.com/Auc4',
		},
		{
			id: 2,
			perfilGithub: 'https://avatars.githubusercontent.com/u/199831834?v=4',
			name: 'Melqp',
			href: 'https://github.com/Melqp',
		},
		{
			id: 3,
			perfilGithub: 'https://avatars.githubusercontent.com/u/70347526?v=4',
			name: 'fait-arch',
			href: 'https://github.com/fait-arch',
		},
	],
	titleFollow: 'Redes Sociales',
	socials: [
		{
			icon: <Facebook className="text-blue-600" />,
			href: 'https://facebook.com',
		},
		{
			icon: <Twitter className="text-blue-400" />,
			href: 'https://twitter.com',
		},
		{
			icon: <Instagram className="text-pink-500" />,
			href: 'https://instagram.com',
		},
	],
};

export default function CustomFooter() {
	const { theme } = useTheme();
	const isDarkTheme = theme === 'dark';

	return (
		<div
			className="py-6 px-40 transition-colors border"
			style={{
				backgroundColor: isDarkTheme ? 'var(--background)' : 'var(--card)',
				color: 'var(--foreground)',
			}}
		>
			{/* Primera fila */}
			<div className="flex justify-between items-center mb-4">
				{/* Redes Sociales */}
				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">{footerData.titleFollow}</h3>
					<div className="mx-4 flex gap-3">
						{footerData.socials.map((social, index) => (
							<a
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-xl"
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>

				{/* Logo */}
				<div
					className="text-2xl font-bold"
					style={{ color: 'var(--muted-foreground)' }}
				>
					AECC
				</div>
			</div>

			{/* Línea divisoria */}
			<hr className="my-4" style={{ borderColor: 'var(--border)' }} />

			{/* Segunda fila */}
			<div className="flex items-center gap-6">
				<h3 className="font-bold text-lg">{footerData.title}</h3>
				<div className="flex gap-6">
					{footerData.authors.map((author, index) => (
						<div
							className="flex items-center gap-2"
							key={`${author.name}-${index}`}
						>
							<div
								className="w-6 h-6 bg-cover bg-center rounded-full"
								style={{ backgroundImage: `url(${author.perfilGithub})` }}
							></div>
							<a
								href={author.href} // Aquí va el link del perfil de GitHub
								target="_blank" // Para abrir el enlace en una nueva pestaña
								rel="noopener noreferrer" // Mejor seguridad cuando abres enlaces externos
							>
								<p className="text-sm">{author.name}</p>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

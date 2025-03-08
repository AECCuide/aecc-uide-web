'use client';

import { Facebook, Twitter, Instagram } from 'lucide-react';
import { FooterData } from './footerTypes';

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
			icon: <Facebook className="text-red-300" />,
			href: 'https://facebook.com',
		},
		{
			icon: <Twitter className="text-red-300" />,
			href: 'https://twitter.com',
		},
		{
			icon: <Instagram className="text-red-300" />,
			href: 'https://instagram.com',
		},
	],
};

export default footerData;

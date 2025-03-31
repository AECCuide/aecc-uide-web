'use client';

import { Facebook, Instagram } from 'lucide-react';
import { JSX } from 'react';

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
			icon: <Facebook />,
			href: 'https://www.facebook.com/people/AECCuide/61569555116398/?rdid=dvSy2n1kfelpaXXl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A7yUoEArc%2F',
		},
		{
			icon: <Instagram />,
			href: 'https://www.instagram.com/aeccuide/profilecard/?igsh=cGhtNTI3aWxlNTM0',
		},
	],
};

export default footerData;

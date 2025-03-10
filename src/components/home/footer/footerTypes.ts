'use client';

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

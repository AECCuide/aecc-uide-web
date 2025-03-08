'use client';

import React from 'react';
import { Home, Settings, Bell, User } from 'lucide-react';
import { MenuItem } from './menuBarTypes';

export const menuItems: MenuItem[] = [
	{
		icon: <Home className="h-5 w-5" />,
		label: 'Home',
		href: '#',
		gradient:
			'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
		iconColor: 'text-blue-500',
	},
	{
		icon: <Bell className="h-5 w-5" />,
		label: 'Notifications',
		href: '#',
		gradient:
			'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
		iconColor: 'text-orange-500',
	},
	{
		icon: <Settings className="h-5 w-5" />,
		label: 'Settings',
		href: '#',
		gradient:
			'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
		iconColor: 'text-green-500',
	},
	{
		icon: <User className="h-5 w-5" />,
		label: 'Profile',
		href: '#',
		gradient:
			'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)',
		iconColor: 'text-red-500',
	},
];

export const itemVariants = {
	initial: { rotateX: 0, opacity: 1 },
	hover: { rotateX: -90, opacity: 0 },
};

export const backVariants = {
	initial: { rotateX: 90, opacity: 0 },
	hover: { rotateX: 0, opacity: 1 },
};

export const glowVariants = {
	initial: { opacity: 0, scale: 0.8 },
	hover: {
		opacity: 1,
		scale: 2,
		transition: {
			opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
			scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
		},
	},
};

export const navGlowVariants = {
	initial: { opacity: 0 },
	hover: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

export const sharedTransition = {
	type: 'spring',
	stiffness: 100,
	damping: 20,
	duration: 0.5,
};

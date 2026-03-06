'use client';

import { Club, Ghost, Ham, Home, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import Image from 'next/image';

const mobileNavItems = [
	{ icon: Home, label: 'Inicio', href: '/' },
	{ icon: Club, label: 'Cuarenta', href: '/cuarenta' },
	{ icon: Ham, label: 'Comida', href: '/eat' },
	{ icon: Ghost, label: 'Tutorias', href: '/tutorias' },
	{ icon: User, label: 'Perfil', href: '/perfil' },
];

export function BottomNavMobile() {
	const pathname = usePathname();
	const { user } = useAuth();

	return (
		<nav className="sm:hidden fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-background/80 border-t border-white/10 z-50">
			<ul className="flex justify-around items-center w-full">
				{mobileNavItems.map((item) => {
					const isActive = pathname === item.href;
					const Icon = item.icon;
					return (
						<li key={item.label} className="flex-1">
							<Link
								href={item.href}
								aria-label={item.label}
								title={item.label}
								className={`flex flex-col items-center justify-center p-2 transition-all duration-300 relative ${
									isActive
										? 'text-[var(--sidebar-primary)]'
										: 'text-[var(--text-color-secondary)] hover:text-[var(--text-color)]'
								}`}
							>
								{item.label === 'Perfil' && user?.photoURL ? (
									<Image
										src={user.photoURL}
										alt="Perfil"
										width={24}
										height={24}
										className={`h-7 w-7 rounded-full object-cover border-2 shadow-sm ${isActive ? 'border-[var(--sidebar-primary)]' : 'border-transparent'}`}
										referrerPolicy="no-referrer"
									/>
								) : (
									<Icon
										className="h-6 w-6 mb-1 mt-1"
										strokeWidth={isActive ? 2.5 : 2}
										aria-hidden="true"
									/>
								)}
								<span className="sr-only">{item.label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

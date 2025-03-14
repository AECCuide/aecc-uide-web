'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import {
	menuItems,
	itemVariants,
	backVariants,
	glowVariants,
	navGlowVariants,
	sharedTransition,
} from './menuBarData';
//import { AlignJustify } from 'lucide-react';

export function MenuBar() {
	const { theme } = useTheme();
	const isDarkTheme = theme === 'dark';

	return (
		<motion.nav
className="p-1 lg:flex lg:min-h-12 lg:gap-sm lg:bg-manitoulinBlack lg:px-4 from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden bg-(--background-bar) fixed top-0 left-0 right-0 z-50"
			initial="initial"
			whileHover="hover"
		>
			<motion.div
				className={`absolute -inset-2 bg-gradient-radial from-transparent ${
					isDarkTheme
						? 'via-purple-400/30 via-50%'
						: 'via-purple-400/20 via-50%'
				} to-transparent rounded-3xl z-0 pointer-events-none`}
				variants={navGlowVariants}
			/>

			{/* Vista de la barra de navegación en celular */}
			<div className="sm:hidden flex justify-between items-center px-4 w-full">
				{/* <AlignJustify className="h-6 w-6" /> */}
				<div className="flex justify-center w-full">
					<div className="text-lg font-bold ">
						<a href="https://aeccuide.github.io/aecc-uide-web/">AECC</a>
					</div>

					<ThemeToggle />
				</div>
			</div>

			{/*Vista de la barra de navegación en computadora*/}
			<ul className="hidden sm:flex items-center gap-2 relative z-10 justify-center">
				<div className="text-lg font-bold ">
					<a href="https://aeccuide.github.io/aecc-uide-web/">AECC</a>
				</div>
        <div className="ml-8 sm:flex items-center  ">
				{menuItems.map((item) => (
					<motion.li key={item.label} className="relative">
						<motion.div
							className=" block rounded-xl overflow-visible group relative"
							style={{ perspective: '600px' }}
							whileHover="hover"
							initial="initial"
						>
							<motion.div
								className="absolute inset-0 z-0 pointer-events-none"
								variants={glowVariants}
								style={{
									background: item.gradient,
									opacity: 0,
									borderRadius: '16px',
								}}
							/>
							<motion.a
								href={item.href}
								className="flex items-center gap-2 px-4  relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
								variants={itemVariants}
								transition={sharedTransition}
								style={{
									transformStyle: 'preserve-3d',
									transformOrigin: 'center bottom',
								}}
							>
								<span
									className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}
								>
									{item.icon}
								</span>
								<span>{item.label}</span>
							</motion.a>
							<motion.a
								href={item.href}
								className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
								variants={backVariants}
								transition={sharedTransition}
								style={{
									transformStyle: 'preserve-3d',
									transformOrigin: 'center top',
									rotateX: 90,
								}}
							>
								<span
									className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}
								>
									{item.icon}
								</span>
								<span>{item.label}</span>
							</motion.a>
						</motion.div>
					</motion.li>
				))}
        </div> 
        <div className="flex w-full items-center justify-end gap-sm md:gap-md">
          <ThemeToggle />
        </div>
			</ul>
		</motion.nav>
	);
}

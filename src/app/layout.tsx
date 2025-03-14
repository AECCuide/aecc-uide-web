'use client';

import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import type React from 'react';
import { RenderMounted } from '@/components/render-mounted';
import { MenuBar } from '@/components/home/menu-bar/menuBar';
import Footer from '@/components/home/footer/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>AECC</title>
			</head>
			<body className={inter.className}>
				<RenderMounted>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
					>
						<MenuBar />
						{children}
						<Footer />
					</ThemeProvider>
				</RenderMounted>
			</body>
		</html>
	);
}

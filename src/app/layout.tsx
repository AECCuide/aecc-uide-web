'use client';

import Script from 'next/script';
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
				{/* Google tag (gtag.js) */}
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-CPME5D45X1"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-CPME5D45X1');
					`}
				</Script>
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
						<div className="mt-10">{children}</div>

						<Footer />
					</ThemeProvider>
				</RenderMounted>
			</body>
		</html>
	);
}

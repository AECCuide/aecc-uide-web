import Script from 'next/script';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import type React from 'react';
import { RenderMounted } from '@/components/render-mounted';
import { MenuBar } from '@/components/home/menu-bar/menuBar';
import Footer from '@/components/home/footer/footer';
import { BottomNavMobile } from '@/components/home/menu-bar/components/bottomNavMobile';
import { AuthProvider } from '@/components/auth-provider';
import { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://aecc.com';

export const metadata: Metadata = {
	title: 'AECC',
	description:
		'Asociación de Estudiantes de Ciencias de la Computación de la Universidad Internacional del Ecuador UIDE Quito', // Implement Meta Description
	alternates: {
		canonical: BASE_URL, // Implement Canonical URL
	},
	openGraph: {
		title: 'AECC', // Implement OG Title
		description:
			'Asociación de Estudiantes de Ciencias de la Computación de la Universidad Internacional del Ecuador UIDE Quito', // Implement OG Description
		images: [
			{
				url: '/favicon.ico', // Implement OG Image
				width: 1200,
				height: 630,
			},
		],
	},
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider>
					{/* Google Tag Manager */}
					<Script id="google-tag-manager" strategy="afterInteractive">
						{`
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-TBWRBQQP');
					`}
					</Script>
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
					{/* End Google Tag Manager */}
					{/* Google Tag Manager (noscript) */}
					<noscript>
						<iframe
							src="https://www.googletagmanager.com/ns.html?id=GTM-TBWRBQQP"
							height="0"
							width="0"
							style={{ display: 'none', visibility: 'hidden' }}
						></iframe>
					</noscript>
					{/* End Google Tag Manager (noscript) */}
					<RenderMounted>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem={false}
						>
							<MenuBar />
							<div className="mt-10">{children}</div>
							<Footer />
							<BottomNavMobile />
						</ThemeProvider>
					</RenderMounted>
				</AuthProvider>
			</body>
		</html>
	);
}

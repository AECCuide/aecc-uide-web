import Script from 'next/script';
import '@/app/globals.css';
import { Bodoni_Moda, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import type React from 'react';
import { MenuBar } from '@/components/home/menu-bar/menuBar';
import Footer from '@/components/home/footer/footer';
import { AuthProvider } from '@/components/auth-provider';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { SITE_URL, asset } from '@/lib/site';
const inter = Inter({ subsets: ['latin'] });

// Serif de alto contraste para los titulares de la portada del torneo.
// Se expone como variable CSS y se usa solo donde hace falta, asi el resto
// del sitio sigue con Inter.
const bodoni = Bodoni_Moda({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
});

const DESCRIPTION =
	'Asociación de Estudiantes de Ciencias de la Computación de la Universidad Internacional del Ecuador UIDE Quito';

export const metadata: Metadata = {
	// Sin metadataBase, Next no puede resolver rutas relativas en los
	// metadatos y lo avisa en cada build.
	metadataBase: new URL(SITE_URL),
	...buildMetadata({
		title: 'AECC',
		description: DESCRIPTION,
		path: '/',
		image: '/og-aecc.png',
		imageAlt:
			'AECC UIDE · Asociación de Estudiantes de Ciencias de la Computación',
	}),
	// Las paginas hijas que definan un title lo reciben con este sufijo.
	title: { default: 'AECC', template: '%s · AECC' },
	icons: {
		// El navegador elige por media query: el icono blanco cuando la
		// interfaz esta en oscuro y el oscuro cuando esta en claro.
		// favicon.ico sigue sirviendo de respaldo por convencion de archivo.
		icon: [
			{
				url: asset('/iconAeccLight.svg'),
				type: 'image/svg+xml',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: asset('/iconAeccDark.svg'),
				type: 'image/svg+xml',
				media: '(prefers-color-scheme: dark)',
			},
		],
		apple: asset('/apple-touch-icon.png'),
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className={`${inter.className} ${bodoni.variable}`}>
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
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
					>
						<MenuBar />
						<div className="mt-10">{children}</div>
						<Footer />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

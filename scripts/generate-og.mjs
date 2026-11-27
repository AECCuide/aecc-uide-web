/**
 * Genera las imagenes Open Graph del sitio como PNG estaticos en public/.
 *
 * Por que PNG y no SVG: WhatsApp, Telegram y la mayoria de los scrapers NO
 * renderizan SVG en og:image. Tampoco .ico. Tiene que ser PNG o JPG, con URL
 * absoluta y, de preferencia, por debajo de ~300 KB.
 *
 * Volve a correr esto cuando cambien la fecha o los horarios:
 *   node scripts/generate-og.mjs
 */

import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const GOLD = '#ffd42a';
const BG = '#121212';
const SERIF = 'Liberation Serif, DejaVu Serif, serif';

/** As de oros, version simplificada para que lea bien en miniatura. */
function medallion(cx, cy, r) {
	const ticks = Array.from({ length: 36 }, (_, i) => i * 10)
		.map(
			(a) =>
				`<line x1="${cx}" y1="${cy - r * 0.94}" x2="${cx}" y2="${cy - r}" stroke="${GOLD}" stroke-width="2" transform="rotate(${a} ${cx} ${cy})"/>`
		)
		.join('');
	const rays = Array.from({ length: 16 }, (_, i) => i * 22.5)
		.map(
			(a) =>
				`<path d="M${cx} ${cy - r * 0.78} L${cx + r * 0.045} ${cy - r * 0.55} L${cx} ${cy - r * 0.49} L${cx - r * 0.045} ${cy - r * 0.55} Z" fill="${GOLD}" opacity="0.9" transform="rotate(${a} ${cx} ${cy})"/>`
		)
		.join('');
	const petals = Array.from({ length: 8 }, (_, i) => i * 45)
		.map(
			(a) =>
				`<ellipse cx="${cx}" cy="${cy - r * 0.26}" rx="${r * 0.1}" ry="${r * 0.22}" stroke="${GOLD}" stroke-width="2" fill="none" transform="rotate(${a} ${cx} ${cy})"/>`
		)
		.join('');

	return `
		<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${GOLD}" stroke-width="2" fill="none"/>
		<circle cx="${cx}" cy="${cy}" r="${r * 0.94}" stroke="${GOLD}" stroke-width="4" fill="none"/>
		${ticks}
		<circle cx="${cx}" cy="${cy}" r="${r * 0.78}" stroke="${GOLD}" stroke-width="1.5" fill="none"/>
		${rays}
		<circle cx="${cx}" cy="${cy}" r="${r * 0.57}" stroke="${GOLD}" stroke-width="3" fill="none"/>
		${petals}
		<circle cx="${cx}" cy="${cy}" r="${r * 0.21}" stroke="${GOLD}" stroke-width="3" fill="none"/>
		<circle cx="${cx}" cy="${cy}" r="${r * 0.07}" fill="${GOLD}"/>`;
}

function card({ eyebrow, title, highlight, lines }) {
	const titleLines = title
		.map(
			(line, i) =>
				`<text x="78" y="${268 + i * 92}" font-family="${SERIF}" font-size="84" fill="#ffffff">${line}</text>`
		)
		.join('');

	// El ritmo vertical se deriva de la cantidad de lineas del titulo, para que
	// la fecha no se monte encima de los detalles.
	const lastTitleY = 268 + (title.length - 1) * 92;
	const highlightY = lastTitleY + 85;

	const detailLines = lines
		.map(
			(line, i) =>
				`<text x="78" y="${highlightY + 62 + i * 38}" font-family="${SERIF}" font-size="27" fill="#b4b4b4">${line}</text>`
		)
		.join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
		<rect width="${W}" height="${H}" fill="${BG}"/>
		<rect x="22" y="22" width="${W - 44}" height="${H - 44}" rx="10" fill="none" stroke="${GOLD}" stroke-opacity="0.38" stroke-width="2"/>
		${medallion(975, 315, 215)}
		<text x="78" y="128" font-family="${SERIF}" font-size="26" letter-spacing="7" fill="${GOLD}">${eyebrow}</text>
		${titleLines}
		<text x="78" y="${highlightY}" font-family="${SERIF}" font-size="42" fill="${GOLD}">${highlight}</text>
		${detailLines}
	</svg>`;
}

const images = [
	{
		file: 'public/og-cuarenta.png',
		svg: card({
			eyebrow: 'AECC UIDE',
			title: ['Torneo de', 'Cuarenta'],
			highlight: '8 de diciembre de 2026',
			lines: [
				'Turno Mañana 10:00 AM  ·  Turno Tarde 2:30 PM / 3:00 PM',
				'En parejas · 4 jugadores por mesa · 1 baraja por mesa',
			],
		}),
	},
	{
		file: 'public/og-aecc.png',
		svg: card({
			eyebrow: 'AECC UIDE',
			title: ['Asociación de', 'Estudiantes'],
			highlight: 'Ciencias de la Computación',
			lines: ['Universidad Internacional del Ecuador · Quito'],
		}),
	},
];

for (const { file, svg } of images) {
	const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
	writeFileSync(file, png);
	console.log(`${file}  ${(png.length / 1024).toFixed(0)} KB`);
}

// iOS no admite SVG como apple-touch-icon: tiene que ser PNG, y sin
// transparencia porque algunas versiones la rellenan de negro.
const APPLE = 180;
const appleIcon = await sharp('public/iconAeccLight.svg')
	.resize(APPLE - 24, APPLE - 24, { fit: 'contain', background: '#ffffff' })
	.extend({
		top: 12,
		bottom: 12,
		left: 12,
		right: 12,
		background: '#ffffff',
	})
	.flatten({ background: '#ffffff' })
	.png()
	.toBuffer();
writeFileSync('public/apple-touch-icon.png', appleIcon);
console.log(`public/apple-touch-icon.png  ${(appleIcon.length / 1024).toFixed(0)} KB`);

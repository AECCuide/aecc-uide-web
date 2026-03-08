export interface EventActivity {
	id: string;
	dateStr: string;
	dayOfWeek: string;
	time: string;
	title: string;
	location: string;
	guests: string;
	image: string;
	status: 'proximos' | 'pasados';
}

export const eventsData: EventActivity[] = [
	{
		id: 'evento-1',
		dateStr: '2 dic 2025',
		dayOfWeek: 'martes',
		time: '9:00',
		title: 'TORNEO DE CUARENTA',
		location: 'UIDE - Universidad Internacional del Ecuador',
		guests: 'Sin invitados',
		image:
			'https://i.pinimg.com/736x/94/e4/5d/94e45d12c714cd677f6d1d89f44b0b46.jpg',
		status: 'pasados',
	},
	{
		id: 'evento-2',
		dateStr: '7 nov 2025',
		dayOfWeek: 'viernes',
		time: '9:00',
		title: 'Primera flag: Introducción a CTFs',
		location: 'UIDE - Universidad Internacional del Ecuador',
		guests: 'Sin invitados',
		image:
			'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/pl/e8d9aa98-8e47-4488-9d3e-fdd2c64a6f1b.webp',
		status: 'pasados',
	},
	{
		id: 'evento-3',
		dateStr: '28 oct 2025',
		dayOfWeek: 'martes',
		time: '16:00 - 17:00',
		title: 'Bug Bounty y Pentest Dos mundos, una misma misión!',
		location: 'UIDE - Universidad Internacional del Ecuador',
		guests: 'Sin invitados',
		image:
			'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/oj/f7ff2b6f-5d7e-43af-9d14-8223a0c7ed85.jpg',
		status: 'pasados',
	},
	{
		id: 'evento-4',
		dateStr: '1 abr 2026',
		dayOfWeek: 'miércoles',
		time: 'Por definir',
		title: 'Charla Cloud',
		location: 'UIDE',
		guests: 'Por confirmar',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-5',
		dateStr: '10 jun 2026',
		dayOfWeek: 'miércoles',
		time: 'Por definir',
		title: 'Charla Técnica 2 (Tema por definir)',
		location: 'UIDE',
		guests: 'Por confirmar',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-6',
		dateStr: '17 abr 2026',
		dayOfWeek: 'viernes',
		time: 'Día 1',
		title: 'Mini Bootcamp 1 (Tema por definir)',
		location: 'UIDE',
		guests: 'Por confirmar',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-7',
		dateStr: '8 may 2026',
		dayOfWeek: 'viernes',
		time: 'Día 1',
		title: 'Mini Bootcamp 2 (Tema por definir)',
		location: 'UIDE',
		guests: 'Por confirmar',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-8',
		dateStr: '28 may 2026',
		dayOfWeek: 'jueves',
		time: '1er Día',
		title: 'Competencia Técnica Interna',
		location: 'UIDE',
		guests: 'Equipos internos',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-9',
		dateStr: '29 may 2026',
		dayOfWeek: 'viernes',
		time: 'Noche',
		title: 'Networking Night (Post Competencia)',
		location: 'UIDE',
		guests: 'Para estudiantes y participantes',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-10',
		dateStr: '6 abr 2026',
		dayOfWeek: 'lunes',
		time: 'Inicios de Partidos',
		title: 'Torneo de Deportes - Fútbol',
		location: 'Canchas UIDE',
		guests: 'Equipos estudiantiles',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-11',
		dateStr: '23 abr 2026',
		dayOfWeek: 'jueves',
		time: 'Inicios de Partidos',
		title: 'Torneo de Deportes - Basket',
		location: 'Canchas UIDE',
		guests: 'Equipos estudiantiles',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-12',
		dateStr: '19 jun 2026',
		dayOfWeek: 'viernes',
		time: 'Todo el día',
		title: 'Feria de Proyectos Final de Semestre',
		location: 'Stands IEEE, ASO UIDE, Clubes',
		guests: 'Toda la comunidad',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-13',
		dateStr: '29 abr 2026',
		dayOfWeek: 'miércoles',
		time: 'Por confirmar',
		title: 'Talleres Prácticos: Git y Github',
		location: 'Laboratorios UIDE',
		guests: 'Abierto a estudiantes',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
	{
		id: 'evento-14',
		dateStr: '5 jun 2026',
		dayOfWeek: 'viernes',
		time: 'Por confirmar',
		title: 'Torneo E-Sports',
		location: 'Virtual / UIDE',
		guests: 'Equipos registrados',
		image:
			'https://i.pinimg.com/1200x/0a/5d/ea/0a5deaeaed404202d498b6ea1e88941f.jpg',
		status: 'proximos',
	},
];

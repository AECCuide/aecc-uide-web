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
			'https://i.pinimg.com/736x/94/e4/5d/94e45d12c714cd677f6d1d89f44b0b46.jpg', // Imagen de cartas
		status: 'pasados',
	},
];

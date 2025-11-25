'use client';

import { useState, useEffect } from 'react';

export interface ParticipantData {
	name: string;
	course: string;
	phone: string;
}

export interface TeamData {
	id: string;
	teamName: string;
	participants: {
		participant1: ParticipantData;
		participant2: ParticipantData;
	};
	paymentMethod: string;
	pagado: boolean;
	url: string;
	timestamp: string;
}

export const useGrup = () => {
	const [teams, setTeams] = useState<TeamData[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	// Cargar datos iniciales (simulado - aquí conectarías tu API)
	useEffect(() => {
		// Datos de ejemplo
		const mockData: TeamData[] = [
			{
				id: 'pareja_001',
				teamName: 'Los Campeones',
				participants: {
					participant1: {
						name: 'Juan Pérez',
						course: 'Ingeniería en Software',
						phone: '0991234567',
					},
					participant2: {
						name: 'María López',
						course: 'Ciencias de Datos',
						phone: '0987654321',
					},
				},
				paymentMethod: 'Transferencia',
				pagado: false,
				url: 'https://tusitio.com/registro/pareja_001',
				timestamp: '2025-11-25T18:42:53.123Z',
			},
			{
				id: 'pareja_002',
				teamName: 'Dúo Dinámico',
				participants: {
					participant1: {
						name: 'Carlos Ruiz',
						course: 'Ingeniería Civil',
						phone: '0998765432',
					},
					participant2: {
						name: 'Ana García',
						course: 'Arquitectura',
						phone: '0991122334',
					},
				},
				paymentMethod: 'Efectivo',
				pagado: true,
				url: 'https://tusitio.com/registro/pareja_002',
				timestamp: '2025-11-25T19:15:30.456Z',
			},
		];

		setTimeout(() => {
			setTeams(mockData);
			setLoading(false);
		}, 500);
	}, []);

	const togglePayment = (id: string) => {
		setTeams((prevTeams) =>
			prevTeams.map((team) =>
				team.id === id ? { ...team, pagado: !team.pagado } : team
			)
		);
	};

	const deleteTeam = (id: string) => {
		setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
		setSelectedTeam(null);
	};

	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleString('es-EC', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return {
		teams,
		loading,
		selectedTeam,
		setSelectedTeam,
		togglePayment,
		deleteTeam,
		formatDate,
	};
};

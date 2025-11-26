'use client';

import { useState, useEffect, useCallback } from 'react';

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
	ImageUrl: string;
	timestamp: string;
}

export async function submitCuarentaRegistration(
	registrationData: Omit<TeamData, 'id' | 'pagado' | 'timestamp' | 'ImageUrl'>
): Promise<TeamData> {
	// TODO: Reemplaza '/api/cuarenta/register' con tu endpoint real.
	const endpoint = '/api/cuarenta/register';

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(registrationData),
	});

	if (!response.ok) {
		const errorData = (await response.json()) as { message?: string };
		throw new Error(
			errorData.message ?? `Error en el servidor: ${response.statusText}`
		);
	}

	return response.json() as Promise<TeamData>;
}

async function fetchTeams(): Promise<TeamData[]> {
	// TODO: Reemplaza '/api/cuarenta/teams' con tu endpoint real.
	const endpoint = '/api/cuarenta/teams';
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw new Error('No se pudieron obtener los equipos');
	}
	return response.json() as Promise<TeamData[]>;
}

export const useGrup = () => {
	const [teams, setTeams] = useState<TeamData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadTeams = useCallback(async () => {
		try {
			setLoading(true);
			const data = await fetchTeams();
			setTeams(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Ocurrió un error');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadTeams();
	}, [loadTeams]);

	const togglePayment = async (id: string) => {
		const team = teams.find((t) => t.id === id);
		if (!team) return;

		const response = await fetch(`/api/cuarenta/teams/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ pagado: !team.pagado }),
		});

		if (response.ok) {
			const updatedTeam = (await response.json()) as TeamData;
			setTeams((currentTeams) =>
				currentTeams.map((t) => (t.id === id ? updatedTeam : t))
			);
		}
	};

	const deleteTeam = async (id: string) => {
		const response = await fetch(`/api/cuarenta/teams/${id}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
		}
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
		error,
		togglePayment,
		deleteTeam,
		formatDate,
		reloadTeams: loadTeams,
	};
};

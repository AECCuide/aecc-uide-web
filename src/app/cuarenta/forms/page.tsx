'use client';

import React, { useCallback } from 'react';
import { useReducer, Reducer } from 'react';
import { CreditCard, ChevronDown } from 'lucide-react';
import ParticipantCard from '@/components/cuarenta/components/ParticipantCard';
import { cuarentaFormSchema } from '@/components/cuarenta/hooks/validation';
import { z } from 'zod';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';

// --- Constants ---
const PAYMENT_METHODS = ['Efectivo', 'Transferencia'];

// --- Types ---
export interface Participant {
	name: string;
	course: string;
	phone: string;
}

interface State {
	teamName: string;
	participants: [Participant, Participant];
	paymentMethod: string;
	activeDropdown: string | null;
	errors: {
		teamName?: string;
		participants: [
			Partial<Record<keyof Participant, string>>,
			Partial<Record<keyof Participant, string>>,
		];
	};
	touched: boolean;
	showConfetti: boolean;
}

type Action =
	| { type: 'SET_TEAM_NAME'; payload: string }
	| {
			type: 'SET_PARTICIPANT_FIELD';
			payload: { index: number; field: keyof Participant; value: string };
	  }
	| { type: 'SET_PAYMENT_METHOD'; payload: string }
	| { type: 'TOGGLE_DROPDOWN'; payload: string | null }
	| { type: 'SET_ERRORS'; payload: State['errors'] }
	| {
			type: 'SET_PARTICIPANT_ERRORS';
			payload: {
				index: number;
				errors: Partial<Record<keyof Participant, string>>;
			};
	  }
	| { type: 'SET_TOUCHED'; payload: boolean }
	| { type: 'SET_SHOW_CONFETTI'; payload: boolean };

// --- Reducer ---
const initialState: State = {
	teamName: '',
	participants: [
		{ name: '', course: '', phone: '' },
		{ name: '', course: '', phone: '' },
	],
	paymentMethod: 'Efectivo',
	activeDropdown: null,
	errors: {
		participants: [{}, {}],
	},
	touched: false,
	showConfetti: false,
};

const registrationReducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'SET_TEAM_NAME':
			return { ...state, teamName: action.payload };
		case 'SET_PARTICIPANT_FIELD': {
			const newParticipants = [...state.participants] as [
				Participant,
				Participant,
			];
			const { index, field, value } = action.payload;
			newParticipants[index] = { ...newParticipants[index], [field]: value };
			return { ...state, participants: newParticipants };
		}
		case 'SET_PAYMENT_METHOD':
			return { ...state, paymentMethod: action.payload, activeDropdown: null };
		case 'TOGGLE_DROPDOWN':
			return {
				...state,
				activeDropdown:
					state.activeDropdown === action.payload ? null : action.payload,
			};
		case 'SET_ERRORS':
			return { ...state, errors: action.payload };
		case 'SET_PARTICIPANT_ERRORS': {
			const newErrors = { ...state.errors };
			newErrors.participants[action.payload.index] = action.payload.errors;
			return { ...state, errors: newErrors };
		}
		case 'SET_TOUCHED':
			return { ...state, touched: action.payload };
		case 'SET_SHOW_CONFETTI':
			return { ...state, showConfetti: action.payload };
		default:
			return state;
	}
};

// --- Reusable Components ---
const FormField = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-zinc-800/40 rounded-2xl px-4 py-4">{children}</div>
);

export default function TeamRegistration() {
	const [state, dispatch] = useReducer(registrationReducer, initialState);

	const particlesInit = useCallback(async (engine: Engine) => {
		await loadConfettiPreset(engine);
	}, []);

	const handleParticipantChange = (
		index: number,
		field: keyof Participant,
		value: string
	) => {
		dispatch({
			type: 'SET_PARTICIPANT_FIELD',
			payload: { index, field, value },
		});
	};

	const handleParticipantErrors = (
		index: number,
		errors: Partial<Record<keyof Participant, string>>
	) => {
		dispatch({
			type: 'SET_PARTICIPANT_ERRORS',
			payload: { index, errors },
		});
	};

	const validateForm = (): boolean => {
		try {
			// Validar todo el formulario
			cuarentaFormSchema.parse({
				teamName: state.teamName,
				participants: state.participants,
			});

			// Si pasa la validación, limpiar errores
			dispatch({
				type: 'SET_ERRORS',
				payload: {
					participants: [{}, {}],
				},
			});

			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: State['errors'] = {
					participants: [{}, {}],
				};

				error.issues.forEach((err) => {
					const path = err.path;

					// Error en teamName
					if (path[0] === 'teamName') {
						newErrors.teamName = err.message;
					}

					// Error en participants
					if (path[0] === 'participants' && typeof path[1] === 'number') {
						const participantIndex = path[1];
						const field = path[2] as keyof Participant;

						newErrors.participants[participantIndex][field] = err.message;
					}
				});

				dispatch({
					type: 'SET_ERRORS',
					payload: newErrors,
				});
			}

			return false;
		}
	};

	const handleSubmit = () => {
		dispatch({ type: 'SET_TOUCHED', payload: true });

		if (!validateForm()) {
			return;
		}

		const registrationData = {
			teamName: state.teamName,
			participants: {
				participant1: state.participants[0],
				participant2: state.participants[1],
			},
			paymentMethod: state.paymentMethod,
			timestamp: new Date().toISOString(),
		};

		// Imprimir JSON en la consola
		console.log(JSON.stringify(registrationData, null, 2));

		// Guardar JSON en localStorage
		localStorage.setItem(
			'lastRegistration',
			JSON.stringify(registrationData, null, 2)
		);

		// Mostrar confeti
		dispatch({ type: 'SET_SHOW_CONFETTI', payload: true });

		// Ocultar confeti después de 5 segundos
		setTimeout(() => {
			dispatch({ type: 'SET_SHOW_CONFETTI', payload: false });
		}, 5000);
	};

	return (
		<div className="min-h-screen from-zinc-900 via-neutral-900 to-stone-900 p-0">
			{state.showConfetti && (
				<Particles
					id="tsparticles"
					init={particlesInit}
					options={{
						preset: 'confetti',
						zIndex: { value: 9999 },
					}}
				/>
			)}
			<div className="max-w-2xl mx-auto">
				{/* Team Name */}
				<div className="px-6 py-8">
					<input
						type="text"
						value={state.teamName}
						onChange={(e) => {
							dispatch({ type: 'SET_TEAM_NAME', payload: e.target.value });
						}}
						placeholder="Nombre del Equipo"
						className={`w-full bg-transparent border-none text-3xl md:text-4xl font-bold tracking-wider placeholder-stone-600 focus:outline-none ${
							state.errors.teamName && state.touched
								? 'text-red-500'
								: 'text-stone-400'
						}`}
					/>
					{state.errors.teamName && state.touched && (
						<p className="text-red-500 text-sm mt-2 px-1">
							{state.errors.teamName}
						</p>
					)}
				</div>

				<div className="px-6 py-6 space-y-6">
					{/* Participants */}
					<div>
						<h3 className="text-stone-500 text-xs font-medium mb-3 px-1">
							Participantes
						</h3>
						<div className="space-y-2">
							{state.participants.map((participant, index) => (
								<ParticipantCard
									key={index}
									participant={participant}
									index={index}
									isDropdownOpen={
										state.activeDropdown === `course${(index + 1).toString()}`
									}
									onFieldChange={(field, value) => {
										handleParticipantChange(index, field, value);
									}}
									onDropdownToggle={() => {
										dispatch({
											type: 'TOGGLE_DROPDOWN',
											payload: `course${(index + 1).toString()}`,
										});
									}}
									onErrorsChange={(errors) => {
										handleParticipantErrors(index, errors);
									}}
									externalErrors={
										state.touched ? state.errors.participants[index] : {}
									}
								/>
							))}
						</div>
					</div>

					{/* Payment Method */}
					<div>
						<h3 className="text-stone-500 text-xs font-medium mb-3 px-1">
							Información del registro
						</h3>
						<FormField>
							<div className="flex items-center justify-between relative">
								<div className="flex items-center gap-3">
									<CreditCard className="w-5 h-5 text-stone-500" />
									<span className="text-stone-400 text-sm">Método de pago</span>
								</div>
								<div className="relative">
									<button
										onClick={() => {
											dispatch({ type: 'TOGGLE_DROPDOWN', payload: 'payment' });
										}}
										className="flex items-center gap-2 text-stone-500 text-sm"
									>
										<span>{state.paymentMethod}</span>
										<ChevronDown className="w-4 h-4" />
									</button>
									{state.activeDropdown === 'payment' && (
										<div className="absolute right-0 top-full mt-2 bg-zinc-800 rounded shadow-lg overflow-hidden z-10 min-w-[140px]">
											{PAYMENT_METHODS.map((method) => (
												<button
													key={method}
													onClick={() => {
														dispatch({
															type: 'SET_PAYMENT_METHOD',
															payload: method,
														});
													}}
													className="w-full px-4 py-2.5 text-left text-stone-300 text-sm hover:bg-amber-700/80 transition-colors"
												>
													{method}
												</button>
											))}
										</div>
									)}
								</div>
							</div>
						</FormField>
					</div>

					{/* Submit Button */}
					<div className="pt-6 pb-8">
						<button
							onClick={handleSubmit}
							className="w-full py-4 bg-white text-stone-900 rounded-2xl font-medium hover:bg-stone-100 transition-colors shadow-lg"
						>
							Registrar equipo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

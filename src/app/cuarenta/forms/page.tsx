'use client';

import React from 'react';
import { useReducer, Reducer } from 'react';
import { CreditCard, ChevronDown } from 'lucide-react';
import ParticipantCard from '@/components/cuarenta/components/ParticipantCard';

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
}

type Action =
	| { type: 'SET_TEAM_NAME'; payload: string }
	| {
			type: 'SET_PARTICIPANT_FIELD';
			payload: { index: number; field: keyof Participant; value: string };
	  }
	| { type: 'SET_PAYMENT_METHOD'; payload: string }
	| { type: 'TOGGLE_DROPDOWN'; payload: string | null };

// --- Reducer ---
const initialState: State = {
	teamName: '',
	participants: [
		{ name: '', course: '', phone: '' },
		{ name: '', course: '', phone: '' },
	],
	paymentMethod: 'Efectivo',
	activeDropdown: null,
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

	const handleParticipantChange = (
		index: number,
		field: keyof Participant,
		value: string
	) => {
		dispatch({
			type: 'SET_PARTICIPANT_FIELD',
			payload: { index, field, value },
		});

		// Log para ver los cambios en tiempo real
		console.log(`Participante ${(index + 1).toString()} - ${field}:`, value);
	};

	const handleSubmit = () => {
		const registrationData = {
			teamName: state.teamName,
			participants: {
				participant1: state.participants[0],
				participant2: state.participants[1],
			},
			paymentMethod: state.paymentMethod,
		};
		console.log('Registration Data:', registrationData);
		alert('Registro completado! Revisa la consola para ver los datos.');
	};

	return (
		<div className="min-h-screen  from-zinc-900 via-neutral-900 to-stone-900 p-0">
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
						className="w-full bg-transparent border-none text-3xl md:text-4xl font-bold tracking-wider text-stone-400 placeholder-stone-600 focus:outline-none"
					/>
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

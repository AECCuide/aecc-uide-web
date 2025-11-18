'use client';

import { useState } from 'react';
import { FileText, Ticket, Users, Trophy, Edit2 } from 'lucide-react';

export default function EventCreator() {
	const [eventName, setEventName] = useState('');
	const [startDate] = useState('lun, 17 nov');
	const [startTime] = useState('09:30 p.m.');
	const [endDate] = useState('lun, 17 nov');
	const [endTime] = useState('10:30 p.m.');
	const [requiresApproval, setRequiresApproval] = useState(true);
	const [location] = useState('');
	const [locationDetail] = useState('');
	const [description, setDescription] = useState('');
	const [tickets, setTickets] = useState('Gratis');
	const [capacity, setCapacity] = useState('Ilimitado');
	const [editingTickets, setEditingTickets] = useState(false);
	const [editingCapacity, setEditingCapacity] = useState(false);

	return (
		<div className="min-h-screen bg-linear-to-b from-zinc-900 via-neutral-900 to-stone-900 p-0">
			<div className="max-w-2xl mx-auto">
				{/* Event Name Input - Full width at top */}
				<div className="px-6 py-8">
					<input
						type="text"
						value={eventName}
						onChange={(e) => {
							setEventName(e.target.value);
						}}
						placeholder="Nombre del Equipo"
						className="w-full bg-transparent border-none text-3xl md:text-4xl font-bold tracking-wider text-stone-400 placeholder-stone-600 focus:outline-none"
					/>
				</div>

				{/* Main Content */}
				<div className="px-6 py-6 space-y-4">
					<h3 className="text-stone-500 text-xs font-medium mb-3 px-1">
						Opciones del evento
					</h3>
					{/* Description Input */}
					<div className="w-full bg-zinc-800/40 rounded-2xl px-4 py-4">
						<h3 className="text-stone-500 text-xs font-medium mb-3 px-1">
							Opciones del evento
						</h3>
						<div className="flex items-start gap-3">
							<FileText className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
							<textarea
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								placeholder="Agregar descripción"
								rows={1}
								className="w-full bg-transparent text-stone-400 text-sm focus:outline-none placeholder-stone-400 resize-none"
								onInput={(e) => {
									const target = e.target as HTMLTextAreaElement;
									target.style.height = 'auto';
									target.style.height = `${target.scrollHeight.toString()}px`;
								}}
							/>
						</div>
					</div>

					{/* Event Options */}
					<div className="pt-4">
						<h3 className="text-stone-500 text-xs font-medium mb-3 px-1">
							Opciones del evento
						</h3>

						<div className="space-y-2">
							{/* Tickets */}
							<div className="bg-zinc-800/40 rounded-2xl px-4 py-3.5 flex items-center justify-between hover:bg-zinc-800/60 transition-colors">
								<div className="flex items-center gap-3">
									<Ticket className="w-5 h-5 text-stone-500" />
									<span className="text-stone-400 text-sm">Entradas</span>
								</div>
								<div className="flex items-center gap-2">
									{editingTickets ? (
										<input
											type="text"
											value={tickets}
											onChange={(e) => {
												setTickets(e.target.value);
											}}
											onBlur={() => {
												setEditingTickets(false);
											}}
											autoFocus
											className="bg-transparent text-stone-400 text-sm focus:outline-none text-right w-24"
										/>
									) : (
										<span className="text-stone-500 text-sm">{tickets}</span>
									)}
									<button
										onClick={() => {
											setEditingTickets(true);
										}}
										className="text-stone-500 hover:text-stone-400"
									>
										<Edit2 className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>

							{/* Requires Approval */}
							<div className="bg-zinc-800/40 rounded-2xl px-4 py-3.5 flex items-center justify-between hover:bg-zinc-800/60 transition-colors">
								<div className="flex items-center gap-3">
									<Users className="w-5 h-5 text-stone-500" />
									<span className="text-stone-400 text-sm">
										Requiere aprobación
									</span>
								</div>
								<button
									onClick={() => {
										setRequiresApproval(!requiresApproval);
									}}
									className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
										requiresApproval ? 'bg-emerald-600' : 'bg-stone-700'
									}`}
								>
									<div
										className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
											requiresApproval ? 'translate-x-5' : 'translate-x-0.5'
										}`}
									/>
								</button>
							</div>

							{/* Capacity */}
							<div className="bg-zinc-800/40 rounded-2xl px-4 py-3.5 flex items-center justify-between hover:bg-zinc-800/60 transition-colors">
								<div className="flex items-center gap-3">
									<Trophy className="w-5 h-5 text-stone-500" />
									<span className="text-stone-400 text-sm">Cupo</span>
								</div>
								<div className="flex items-center gap-2">
									{editingCapacity ? (
										<input
											type="text"
											value={capacity}
											onChange={(e) => {
												setCapacity(e.target.value);
											}}
											onBlur={() => {
												setEditingCapacity(false);
											}}
											autoFocus
											className="bg-transparent text-stone-400 text-sm focus:outline-none text-right w-24"
										/>
									) : (
										<span className="text-stone-500 text-sm">{capacity}</span>
									)}
									<button
										onClick={() => {
											setEditingCapacity(true);
										}}
										className="text-stone-500 hover:text-stone-400"
									>
										<Edit2 className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Create Event Button */}
					<div className="pt-6 pb-8">
						<button
							onClick={() => {
								const eventData = {
									eventName,
									startDate,
									startTime,
									endDate,
									endTime,
									location,
									locationDetail,
									description,
									tickets,
									capacity,
									requiresApproval,
								};
								console.log('Event Data:', eventData);
								alert('Evento creado! Revisa la consola para ver los datos.');
							}}
							className="w-full py-4 bg-white text-stone-900 rounded-2xl font-medium hover:bg-stone-100 transition-colors shadow-lg"
						>
							Crear evento
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { eventsData } from './eventsData';

export default function EventsCalendar() {
	const [activeTab, setActiveTab] = useState<'proximos' | 'pasados'>(
		'proximos'
	);

	const filteredEvents = eventsData.filter(
		(event) => event.status === activeTab
	);

	return (
		<div className="w-full max-w-5xl mx-auto py-8">
			{/* Header con Título y Tabs */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
				<div className="flex bg-muted rounded-xl p-1 border border-border">
					<button
						type="button"
						onClick={() => setActiveTab('proximos')}
						className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex-1 text-center ${
							activeTab === 'proximos'
								? 'bg-card text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						Próximos
					</button>
					<button
						type="button"
						onClick={() => setActiveTab('pasados')}
						className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex-1 text-center ${
							activeTab === 'pasados'
								? 'bg-card text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						Pasados
					</button>
				</div>
			</div>

			{/* Timeline */}
			<div className="relative">
				{/* Línea vertical punteada */}
				<div className="absolute top-4 bottom-0 left-[16px] sm:left-[120px] w-px border-l-2 border-dashed border-border" />

				<div className="flex flex-col gap-10">
					{filteredEvents.map((event) => (
						<div
							key={event.id}
							className="relative flex flex-col sm:flex-row gap-6 sm:gap-12 group"
						>
							{/* Fecha - Izquierda (en móvil arriba de la tarjeta, conectada a la línea) */}
							<div className="sm:w-[100px] flex-shrink-0 sm:pt-4 pl-10 sm:pl-0 sm:text-right">
								<div className="text-[17px] font-bold text-foreground">
									{event.dateStr}
								</div>
								<div className="text-sm text-muted-foreground capitalize">
									{event.dayOfWeek}
								</div>
							</div>

							{/* Punto del Timeline */}
							<div className="absolute left-[11.5px] sm:left-[115px] top-[4px] sm:top-[22px] w-[10px] h-[10px] rounded-full bg-muted-foreground z-10 box-content border-[3px] border-background group-hover:bg-primary transition-colors" />

							{/* Tarjeta - Derecha */}
							<div className="flex-1 bg-card rounded-2xl border border-border p-5 flex flex-col md:flex-row gap-6 hover:border-border/80 transition-colors ml-10 sm:ml-0 shadow-sm relative overflow-hidden">
								{/* Info del evento */}
								<div className="flex-1 flex flex-col">
									<div className="text-sm font-medium text-muted-foreground mb-1">
										{event.time}
									</div>
									<h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
										{event.title}
									</h3>

									<div className="flex flex-col gap-2 mt-auto mb-6">
										<div className="flex items-center text-sm text-muted-foreground">
											<MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
											<span className="truncate">{event.location}</span>
										</div>
										<div className="flex items-center text-sm text-muted-foreground">
											<Users className="w-4 h-4 mr-2 flex-shrink-0" />
											<span>{event.guests}</span>
										</div>
									</div>

									<button
										type="button"
										className="flex items-center text-sm font-medium bg-muted text-foreground px-4 py-2.5 rounded-xl hover:bg-hover-gray transition-colors w-max"
									>
										Gestionar evento <ArrowRight className="w-4 h-4 ml-2" />
									</button>
								</div>

								{/* Imagen del evento */}
								<div className="w-full md:w-[160px] aspect-video md:aspect-square flex-shrink-0 rounded-2xl overflow-hidden relative bg-muted border border-border">
									<Image
										src={event.image}
										alt={event.title}
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					))}

					{filteredEvents.length === 0 && (
						<div className="pl-10 sm:pl-[140px] text-muted-foreground py-8">
							No hay eventos en esta categoría.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

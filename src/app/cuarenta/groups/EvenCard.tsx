'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { TeamData } from '@/modules/sheets/usegrup';

interface EventCardProps {
	team: TeamData;
	onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ team, onClick }) => {
	const participantCount = 2; // Siempre son 2 participantes

	return (
		<div
			className="bg-card border border-border rounded-2xl p-6 hover:border-primary/10 transition-all cursor-pointer group"
			onClick={onClick}
		>
			<div className="flex items-start justify-between gap-4">
				{/* Content */}
				<div className="flex-1 space-y-3">
					{/* Time */}
					<span className="text-muted-foreground text-sm">
						{new Date(team.timestamp).toLocaleTimeString('es-EC', {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>

					{/* Title */}
					<h3 className="text-foreground font-bold text-xl group-hover:text-primary transition-colors">
						{team.teamName}
					</h3>

					{/* Info */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-muted-foreground text-sm">
							<Users className="w-4 h-4" />
							<span>{participantCount} participantes</span>
						</div>
					</div>

					{/* Button 
					<button className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-medium transition-colors mt-4">
						Ver equipo
						<ArrowRight className="w-4 h-4" />
					</button>
					*/}
				</div>
			</div>
		</div>
	);
};

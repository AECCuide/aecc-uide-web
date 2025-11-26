'use client';

import React from 'react';
import Image from 'next/image';
import {
	X,
	Phone,
	BookOpen,
	Users,
	CreditCard,
	Calendar,
	Check,
} from 'lucide-react';
import { TeamData } from '@/modules/sheets/usegrup';

interface TeamDetailsModalProps {
	team: TeamData;
	onClose: () => void;
}

export const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
	team,
	onClose,
}) => {
	// Cerrar al hacer clic en el backdrop
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
			onClick={handleBackdropClick}
		>
			<div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg animate-in zoom-in-95 duration-200">
				{/* Header */}
				<div className="flex items-start justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
					<div className="flex items-center gap-4">
						{team.ImageUrl && (
							<div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
								<Image
									src={team.ImageUrl}
									alt={team.teamName}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div>
							<h2 className="text-foreground font-bold text-xl">
								{team.teamName}
							</h2>
							<p className="text-muted-foreground text-sm font-mono">
								ID: {team.id.slice(0, 8)}
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-muted rounded-lg transition-colors"
						aria-label="Cerrar modal"
					>
						<X className="w-5 h-5 text-muted-foreground" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Participantes */}
					<div className="space-y-4">
						<h3 className="text-foreground font-semibold text-lg flex items-center gap-2">
							<Users className="w-5 h-5" />
							Participantes
						</h3>

						{[1, 2].map((num) => {
							const key = `participant${String(num)}` as
								| 'participant1'
								| 'participant2';
							const participant = team.participants[key];
							return (
								<div
									key={num}
									className="bg-muted/30 rounded-lg p-4 space-y-3 hover:bg-muted/40 transition-colors"
								>
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
											{num}
										</div>
										<h4 className="text-foreground font-semibold">
											{participant.name}
										</h4>
									</div>
									<div className="space-y-2 text-sm ml-10">
										<div className="flex items-center gap-2 text-muted-foreground">
											<BookOpen className="w-4 h-4" />
											<span>{participant.course}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Phone className="w-4 h-4" />
											<span className="font-mono">{participant.phone}</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Info adicional */}
					<div className="space-y-4">
						<h3 className="text-foreground font-semibold text-lg">
							Información del registro
						</h3>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/40 transition-colors">
								<div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
									<CreditCard className="w-4 h-4" />
									Método de pago
								</div>
								<p className="text-foreground font-medium">
									{team.paymentMethod}
								</p>
							</div>

							<div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/40 transition-colors">
								<div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
									<Calendar className="w-4 h-4" />
									Fecha de registro
								</div>
								<p className="text-foreground font-medium">
									{new Date(team.timestamp).toLocaleDateString('es-EC', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</p>
								<p className="text-muted-foreground text-xs mt-1">
									{new Date(team.timestamp).toLocaleTimeString('es-EC', {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
						</div>
					</div>

					{/* Estado de pago */}
					<div
						className={`rounded-lg p-4 flex items-center gap-3 ${
							team.pagado
								? 'bg-green-500/10 border border-green-500/20'
								: 'bg-destructive/10 border border-destructive/20'
						}`}
					>
						{team.pagado ? (
							<>
								<div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
									<Check className="w-5 h-5 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<p className="text-green-600 dark:text-green-400 font-semibold text-sm">
										Pago confirmado
									</p>
									<p className="text-green-600/70 dark:text-green-400/70 text-xs">
										El equipo está registrado correctamente
									</p>
								</div>
							</>
						) : (
							<>
								<div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
									<X className="w-5 h-5 text-destructive" />
								</div>
								<div>
									<p className="text-destructive font-semibold text-sm">
										Pago pendiente
									</p>
									<p className="text-destructive/70 text-xs">
										Esperando confirmación de pago
									</p>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-border bg-muted/20">
					<button
						onClick={onClose}
						className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
					>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};

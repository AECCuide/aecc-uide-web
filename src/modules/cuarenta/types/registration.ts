import { ShiftId } from '../config/tournament';

export interface Participant {
	name: string;
	course: string;
	phone: string;
}

export interface RegistrationData {
	teamName: string;
	participants: {
		participant1: Participant;
		participant2: Participant;
	};
	carrera: string;
	paymentMethod: string;
	/** Turno elegido para el dia del torneo. */
	turno: ShiftId;
	timestamp: string;
}

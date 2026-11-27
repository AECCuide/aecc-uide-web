import { supabase } from '@/lib/supabase';
import { RegistrationData } from '../types/registration';

export async function submitCuarentaRegistration(
	registrationData: RegistrationData
): Promise<unknown> {
	// La tabla es 'cuarenta_registrations' (plural): es la misma de la que lee
	// el dashboard en modules/sheets/usegrup.ts. Antes se insertaba en
	// 'cuarenta_registration' (singular), asi que los registros no llegaban.
	const { error } = await supabase.from('cuarenta_registrations').insert({
		team_name: registrationData.teamName,
		participant1_name: registrationData.participants.participant1.name,
		participant1_course: registrationData.participants.participant1.course,
		participant1_phone: registrationData.participants.participant1.phone,
		participant2_name: registrationData.participants.participant2.name,
		participant2_course: registrationData.participants.participant2.course,
		participant2_phone: registrationData.participants.participant2.phone,
		carrera: registrationData.carrera,
		payment_method: registrationData.paymentMethod,
		turno: registrationData.turno,
	});

	if (error) {
		throw new Error(`Error en el servidor: ${error.message}`);
	}

	return { success: true };
}

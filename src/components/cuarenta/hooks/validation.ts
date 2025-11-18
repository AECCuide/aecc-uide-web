import { z } from 'zod';

export const participantSchema = z.object({
	name: z
		.string()
		.min(1, 'El nombre es requerido')
		.max(25, 'El nombre de la pareja no debe exceder los 25 caracteres'),
	phone: z
		.string()
		.min(1, 'El celular es requerido')
		.regex(/^[0-9]{10}$/, 'El celular debe tener 10 dígitos'),
	course: z.string().min(1, 'El curso es requerido'),
});

export const cuarentaFormSchema = z.object({
	teamName: z
		.string()
		.min(1, 'El nombre del equipo es requerido')
		.max(12, 'El nombre del equipo no debe exceder los 12 caracteres'),
	participants: z.array(participantSchema).min(2).max(2),
});

export async function submitCuarentaRegistration(
	registrationData: object
): Promise<unknown> {
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
		throw new Error(`Error en el servidor: ${response.statusText}`);
	}

	return response.json();
}

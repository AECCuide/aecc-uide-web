import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// Describe un conjunto de pruebas para el componente Button
describe('Button Component', () => {
	// Prueba 1: Verificar que el botón se renderiza correctamente con su texto.
	test('debe renderizar el botón con el texto proporcionado', () => {
		render(<Button>Haz clic aquí</Button>);

		// Busca el botón por el texto que contiene.
		// La 'i' hace que la búsqueda no distinga entre mayúsculas y minúsculas.
		const buttonElement = screen.getByText(/haz clic aquí/i);

		// Afirmación: Esperamos que el elemento del botón esté en el documento.
		expect(buttonElement).toBeInTheDocument();
	});

	// Prueba 2: Verificar que la función onClick se llama cuando se hace clic en el botón.
	test('debe llamar a la función onClick cuando se hace clic', () => {
		// jest.fn() crea una función "mock" o simulada para rastrear las llamadas.
		const handleClick = jest.fn();

		render(<Button onClick={handleClick}>Haz clic aquí</Button>);

		const buttonElement = screen.getByText(/haz clic aquí/i);

		// Simula un evento de clic en el botón.
		fireEvent.click(buttonElement);

		// Afirmación: Esperamos que la función simulada haya sido llamada una vez.
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	// Prueba 3: Verificar que el botón está deshabilitado cuando se pasa la prop `disabled`.
	test('debe estar deshabilitado si la prop disabled es verdadera', () => {
		render(<Button disabled>No se puede hacer clic</Button>);

		const buttonElement = screen.getByText(/no se puede hacer clic/i);

		// Afirmación: Esperamos que el botón tenga el atributo 'disabled'.
		expect(buttonElement).toBeDisabled();
	});
});

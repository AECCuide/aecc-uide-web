import { test, expect } from '@playwright/test';

test('homepage has a title and a visible button', async ({ page }) => {
	// 1. Navegar a la página principal (usando la baseURL de la configuración)
	await page.goto('/');

	// 2. Verificar que la página tiene el título esperado
	await expect(page).toHaveTitle(/AECC/);

	// 3. Encontrar el enlace por su rol y texto, y verificar que es visible
	const cuarentaLink = page.getByRole('link', { name: /Cuarenta/i });
	await expect(cuarentaLink).toBeVisible();
});

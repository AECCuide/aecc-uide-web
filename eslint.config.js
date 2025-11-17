import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	// Configuración base JavaScript
	js.configs.recommended,

	// Configuración Next.js
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},

	// Configuración TypeScript
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json', // Asegúrate de tener esta línea
			},
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		rules: {
			...typescriptPlugin.configs['strict-type-checked'].rules,
			...typescriptPlugin.configs['stylistic-type-checked'].rules,
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-unnecessary-type-assertion': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
	},

	// Configuración React
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react: reactPlugin,
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
	},

	// Configuración Prettier (DEBE ser el último)
	prettierPlugin,

	// Patrones a ignorar
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'public/**',
			'next.config.js',
			'next-env.d.ts',
			'postcss.config.js',
			'dist/**',
			'build/**',
		],
	},
];

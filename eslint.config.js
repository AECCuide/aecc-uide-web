const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginTypescript = require('@typescript-eslint/eslint-plugin');
const eslintParserTypescript = require('@typescript-eslint/parser');

module.exports = [
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: eslintParserTypescript,
		},
		plugins: {
			react: eslintPluginReact,
			'@typescript-eslint': eslintPluginTypescript,
			prettier: eslintPluginPrettier,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'react/prop-types': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'no-console': 'off',
			'@typescript-eslint/no-unnecessary-type-assertion': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
		ignores: [
			'node_modules',
			'.next',
			'public',
			'next.config.js',
			'next-env.d.ts',
			'postcss.config.js',
		],
	},
];

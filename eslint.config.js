const js = require('@eslint/js')
const ts = require('@typescript-eslint/eslint-plugin')
const prettier = require('eslint-plugin-prettier')

const tsparser = require('@typescript-eslint/parser')

const prettierConfig = require('eslint-config-prettier')

const ignores = [
	'**/*.js',
	'node_modules',
	'build',
	'scripts/output',
	'scripts/input',
	'tests/output',
	'tests/input',
	'.vscode',
	'.git',
]

module.exports = [
	{ ignores },
	{
		files: ['**/*.ts'],

		plugins: { js },

		rules: {
			...js.configs.recommended.rules,

			'no-undef': 'off',
			'no-empty': 'off',

			'no-unused-vars': 'off',
			'no-loop-func': 'off',
			'require-await': 'off',
			'default-param-last': 'off',
			'await-thenable': 'off',
		},
	},
	{
		files: ['**/*.ts'],

		languageOptions: {
			ecmaVersion: 2022,
			parser: tsparser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
			},
		},

		plugins: {
			'@typescript-eslint': ts,
			prettier: prettier,
		},

		rules: {
			...ts.configs.recommended.rules,

			'prettier/prettier': ['warn', { endOfLine: 'auto' }],
			'prefer-arrow-callback': 'warn',
			'no-console': 'warn',
			'no-alert': 'error',
			'no-eval': 'error',
			eqeqeq: 'error',
			'no-self-assign': 'error',
			'no-else-return': 'warn',
			'no-implicit-globals': 'warn',
			'no-implicit-coercion': ['warn', { allow: ['!!'] }],
			'no-empty': ['warn', { allowEmptyCatch: true }],

			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-array-constructor': 'warn',
			'@typescript-eslint/no-array-delete': 'warn',
			'@typescript-eslint/no-for-in-array': 'error',
			'@typescript-eslint/no-misused-new': 'error',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ caughtErrors: 'none', argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-loop-func': 'error',
			'@typescript-eslint/require-await': 'warn',
			'@typescript-eslint/default-param-last': 'warn',
			'@typescript-eslint/await-thenable': 'warn',
		},
	},
	{
		files: ['**/*.test.ts', '**/*.run.ts'],
		rules: {
			'no-console': 'off',
			'no-alert': 'off',
			'no-eval': 'off',
		},
	},
	prettierConfig,
]

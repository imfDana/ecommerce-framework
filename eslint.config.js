const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
    {
        ignores: ['node_modules', 'dist', 'playwright-report', 'test-results', 'eslint.config.js'],
    },

    js.configs.recommended,
    prettier,

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            ...tseslint.configs.recommendedTypeChecked[0].rules,
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
        },
    },

    {
        files: ['tests/**/*.ts'],
        languageOptions: {
            globals: globals.browser,
        },
    },
];

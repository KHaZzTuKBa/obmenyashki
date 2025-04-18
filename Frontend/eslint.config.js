import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    {
        ignores: [
            '**/*', // Игнорировать всё
            '!src', // Не игнорировать папку src
            '!src/**/*', // Не игнорировать файлы внутри src
        ],
    },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    pathGroups: [
                        // Порядок FSD-слоёв (важно соблюсти последовательность)
                        { pattern: '@/app/**', group: 'internal' },
                        { pattern: '@/pages/**', group: 'internal' },
                        { pattern: '@/widgets/**', group: 'internal' },
                        { pattern: '@/features/**', group: 'internal' },
                        { pattern: '@/entities/**', group: 'internal' },
                        { pattern: '@/shared/**', group: 'internal' },

                        // Стилевые файлы
                        {
                            pattern: './*.module.scss',
                            group: 'index',
                            position: 'after',
                        },
                        {
                            pattern: '*.+(css|scss|sass|less|styl)',
                            group: 'index',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                        orderImportKind: 'asc',
                    },
                    warnOnUnassignedImports: true,
                },
            ],
        },
    }
);

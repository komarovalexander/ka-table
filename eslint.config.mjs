import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import preferArrow from 'eslint-plugin-prefer-arrow';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['build/', 'coverage/', 'dist/']),
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@stylistic': stylistic,
            'prefer-arrow': preferArrow,
            'react-hooks': reactHooks,
        },
        rules: {
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'array' }],
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/dot-notation': 'error',
            '@typescript-eslint/naming-convention': ['error', {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid',
            }],
            '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-shadow': ['error', { hoist: 'all' }],
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/triple-slash-reference': ['error', { path: 'always', types: 'prefer-import', lib: 'always' }],
            '@typescript-eslint/unified-signatures': 'error',

            'eqeqeq': ['error', 'smart'],
            'guard-for-in': 'error',
            'id-denylist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
            'max-classes-per-file': ['error', 1],
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-debugger': 'warn',
            'no-duplicate-imports': 'error',
            'no-eval': 'error',
            'no-extra-bind': 'error',
            'no-fallthrough': 'off',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-sequences': 'error',
            'no-template-curly-in-string': 'error',
            'no-throw-literal': 'error',
            'no-undef-init': 'error',
            'object-shorthand': 'error',
            'one-var': ['error', 'never'],
            'prefer-arrow/prefer-arrow-functions': ['error', { allowStandaloneDeclarations: true }],
            'prefer-object-spread': 'error',
            'radix': 'error',
            'valid-typeof': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            '@stylistic/comma-spacing': 'error',
            '@stylistic/eol-last': 'error',
            '@stylistic/indent': ['error', 4, {
                SwitchCase: 0,
                ObjectExpression: 'first',
                FunctionDeclaration: { parameters: 'first' },
                FunctionExpression: { parameters: 'first' },
            }],
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/new-parens': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/rest-spread-spacing': 'error',
            '@stylistic/semi-spacing': 'error',
            '@stylistic/space-in-parens': ['error', 'never'],
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }],
            '@stylistic/type-annotation-spacing': 'error',
        },
    },
    {
        // the code of the library uses unknown, generics or the types of the values instead of any
        files: ['src/lib/**/*.{ts,tsx}'],
        ignores: ['src/lib/**/*.test.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    {
        // the public types keep any: the users get the values of the cells, the keys of the rows and the actions as any,
        // unknown would break their code
        files: [
            'src/lib/actionCreators.ts',
            'src/lib/props.ts',
            'src/lib/types.ts',
            'src/lib/Components/Table/Table.tsx',
            'src/lib/Models/*.ts',
        ],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]);

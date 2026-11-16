/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { scopedCss } from './scripts/scoped-css.mjs';

// the demo site (yarn start, yarn build) and the tests (yarn test)
export default defineConfig({
    base: '/ka-table/',
    plugins: [
        react(),
        // the library styles apply only in the demos which use them (the Bootstrap demo doesn't), bootstrap.css only in its demo
        scopedCss({
            'src/lib/style.css': ['.enable-ka-styles', '.print-content'],
            'bootstrap/dist/css/bootstrap.css': ['.bootstrap-demo'],
        }),
    ],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['src/setupTests.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        // each test file still gets its own jsdom, but jsdom is loaded once per worker,
        // which is several times faster than the default 'forks' pool for this project
        pool: 'vmThreads',
        // as in create-react-app: the mocks are reset before each test
        mockReset: true,
        coverage: {
            provider: 'v8',
            include: ['src/lib/Components/**/*.{ts,tsx}', 'src/lib/Utils/*.ts'],
            exclude: ['**/*.test.{ts,tsx}'],
            reporter: ['text', 'lcov'],
        },
    },
});

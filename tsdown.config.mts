import { rmSync } from 'node:fs';
import { defineConfig } from 'tsdown';

import { completePackage } from './scripts/dist-package.mjs';

// builds the npm package into dist/ (yarn dist);
// each source file stays a separate module, so the deep imports (ka-table/Components/...) keep working
export default defineConfig({
    entry: ['src/lib/**/*.{ts,tsx}', '!src/lib/**/*.test.{ts,tsx}'],
    unbundle: true,
    format: {
        // CommonJS is in the root of the package as in the previous versions, with "__esModule" in every module as tsc did
        cjs: { outDir: 'dist', outputOptions: { esModule: true } },
        esm: { outDir: 'dist/esm' },
    },
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
    platform: 'neutral',
    target: 'es2019',
    dts: true,
    // keeps `exports.default` in CommonJS, as tsc did
    cjsDefault: false,
    deps: {
        neverBundle: [/^react($|\/)/],
    },
    // dist/ contains both formats, so it is cleaned once before the build
    clean: false,
    hooks: {
        'build:prepare': () => rmSync('dist', { force: true, recursive: true }),
        'build:done': completePackage,
    },
});

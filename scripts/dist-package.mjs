import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const writeJson = (file, value) => writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);

// ES modules are in esm/, CommonJS modules are in the root as in the previous versions,
// so the tools which don't support "exports" (Jest 27, webpack 4) keep working
const entry = (path) => ({
    import: { types: `./esm/${path}.d.ts`, default: `./esm/${path}.js` },
    default: { types: `./${path}.d.ts`, default: `./${path}.js` },
});

/**
 * Adds the styles, the documentation, the license and package.json to the package which tsdown builds into dist/
 * (see tsdown.config.mts). The package is published from dist/.
 * AGENTS.md is for the agents which use the package, so in the repository it is in scripts/package/:
 * an AGENTS.md in the root would be read by the agents which work on ka-table itself.
 */
export const completePackage = () => {
    for (const file of ['src/lib/style.css', 'README.md', 'LICENSE', 'scripts/package/AGENTS.md', 'public/llms.txt', 'public/llms-full.txt']) {
        copyFileSync(file, `dist/${file.split('/').pop()}`);
    }
    mkdirSync('dist/themes', { recursive: true });
    copyFileSync('src/lib/themes/dark.css', 'dist/themes/dark.css');

    const { name, version, license, repository, homepage, peerDependencies, keywords } = JSON.parse(readFileSync('package.json', 'utf8'));
    writeJson('dist/package.json', {
        name,
        version,
        license,
        repository,
        homepage,
        main: './index.js',
        types: './index.d.ts',
        sideEffects: ['*.css'],
        exports: {
            '.': entry('index'),
            './style.css': './style.css',
            './themes/dark.css': './themes/dark.css',
            './llms.txt': './llms.txt',
            './llms-full.txt': './llms-full.txt',
            './package.json': './package.json',
            './*.js': entry('*'),
            './*': entry('*'),
        },
        peerDependencies,
        keywords,
    });
    writeJson('dist/esm/package.json', { type: 'module' });
};

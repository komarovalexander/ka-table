import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { compile } from 'sass';

const writeJson = (file, value) => writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);

// ES modules are in esm/, CommonJS modules are in the root as in the previous versions,
// so the tools which don't support "exports" (Jest 27, webpack 4) keep working
const entry = (path) => ({
    import: { types: `./esm/${path}.d.ts`, default: `./esm/${path}.js` },
    default: { types: `./${path}.d.ts`, default: `./${path}.js` },
});

/**
 * Adds the styles, the readme, the license and package.json to the package which tsdown builds into dist/
 * (see tsdown.config.mts). The package is published from dist/.
 */
export const completePackage = () => {
    writeFileSync('dist/style.css', compile('src/lib/style.scss').css);
    for (const file of ['src/lib/style.scss', 'src/lib/_default_theme.scss', 'README.md', 'LICENSE']) {
        copyFileSync(file, `dist/${file.split('/').pop()}`);
    }

    const { name, version, license, repository, homepage, peerDependencies, keywords } = JSON.parse(readFileSync('package.json', 'utf8'));
    writeJson('dist/package.json', {
        name,
        version,
        license,
        repository,
        homepage,
        main: './index.js',
        types: './index.d.ts',
        sideEffects: ['*.css', '*.scss'],
        exports: {
            '.': entry('index'),
            './style.css': './style.css',
            './style.scss': './style.scss',
            './_default_theme.scss': './_default_theme.scss',
            './package.json': './package.json',
            './*.js': entry('*'),
            './*': entry('*'),
        },
        peerDependencies,
        keywords,
    });
    writeJson('dist/esm/package.json', { type: 'module' });
};

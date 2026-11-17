// Generates the llms.txt index and the standalone Markdown reference from the package sources.
// Usage: node scripts/docs/generate-llms.mjs [--check]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractApi } from './api.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const check = process.argv.includes('--check');
const packageJson = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const api = extractApi(root);
const readme = readFileSync(path.join(root, 'README.md'), 'utf8');
const agentNotes = readFileSync(path.join(root, 'scripts/package/AGENTS.md'), 'utf8');
const demosSource = readFileSync(path.join(root, 'src/Demos/Demos.tsx'), 'utf8');

const site = 'https://komarovalexander.github.io/ka-table';
const docs = 'https://ka-table.com';
const repository = 'https://github.com/komarovalexander/ka-table';
const raw = 'https://raw.githubusercontent.com/komarovalexander/ka-table/master';

const section = (text, title) => {
    const heading = `## ${title}`;
    const start = text.indexOf(`${heading}\n`);
    if (start < 0) {
        throw new Error(`Section "${title}" was not found`);
    }
    const next = text.indexOf('\n## ', start + heading.length);
    return text.slice(start, next < 0 ? text.length : next).trim();
};

const inline = (text) => (text || '').replace(/\s*\n\s*/g, ' ').trim();
const cell = (text) => inline(text).replace(/\|/g, '\\|');
const code = (text) => `\`${cell(text || 'unknown')}\``;
const table = (header, rows) => [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.join(' | ')} |`),
].join('\n');

const seeLinks = (jsdoc) => (jsdoc?.tags || [])
    .filter((tag) => tag.tag === 'see')
    .map((tag) => {
        const link = tag.text.match(/\{@link\s+(\S+)\s*\|\s*([^}]+)\}/);
        return link ? `[${link[2].trim()}](${link[1]})` : tag.text;
    });

const description = (jsdoc) => [
    cell(jsdoc?.text),
    ...seeLinks(jsdoc).map((link) => `Demo: ${link}`),
].filter(Boolean).join('<br>');

const declarationOrder = [
    'ITableProps', 'IKaTableProps', 'ITableInstance', 'Column', 'ChildComponents', 'ChildComponent',
    'VirtualScrolling', 'EditableCell', 'Group', 'GroupedColumn', 'Focused', 'LoadingSettings',
];
const declarationNames = Object.keys(api.declarations).filter((name) => api.declarations[name].exported).sort((a, b) => {
    const aIndex = declarationOrder.indexOf(a);
    const bIndex = declarationOrder.indexOf(b);
    if (aIndex >= 0 || bIndex >= 0) {
        return (aIndex < 0 ? declarationOrder.length : aIndex) - (bIndex < 0 ? declarationOrder.length : bIndex);
    }
    return a < b ? -1 : a > b ? 1 : 0;
});

const declarationReference = declarationNames.map((name) => {
    const declaration = api.declarations[name];
    const heritage = declaration.extends.length ? `\n\nExtends: ${declaration.extends.map(code).join(', ')}.` : '';
    const rows = declaration.members.map((member) => [
        code(`${member.name}${member.optional ? '?' : ''}`),
        code(member.type),
        description(member.jsdoc),
    ]);
    return [
        `#### ${name}`,
        `${declaration.kind === 'class' ? 'Class' : 'Interface'} from \`src/lib/${declaration.file}\`.${heritage}`,
        table(['Member', 'Type', 'Description'], rows),
    ].join('\n\n');
}).join('\n\n');

const enumReference = Object.entries(api.enums).filter(([, value]) => value.exported).map(([name, value]) => {
    const values = value.members.map((member) => `${member.name} = ${member.value || member.name}`);
    return `#### ${name}\n\n${values.map((value) => `- ${code(value)}`).join('\n')}`;
}).join('\n\n');

const aliasReference = table(['Name', 'Definition'], Object.entries(api.aliases).filter(([, value]) => value.exported).map(([name, value]) => [
    code(name),
    code(value.type),
]));

const actionTypes = new Map(api.enums.ActionType.members.map((member) => [member.name, member.value]));
const actionReference = table(['Action creator', 'Action type', 'Description'], api.actions.map((action) => {
    const parameters = action.parameters.map((parameter) => `${parameter.name}${parameter.optional ? '?' : ''}: ${parameter.type || 'unknown'}`);
    return [
        code(`${action.name}(${parameters.join(', ')})`),
        code(actionTypes.get(action.actionType) || action.actionType),
        description(action.jsdoc),
    ];
}));

const demos = [...demosSource.matchAll(/new Demo\(\w+, '(\/[^']+)', '([^']+)', '(\w+)'(?:, '[^']*', '[^']*', '([^']*)')?/g)]
    .map((match) => ({ path: match[1], title: match[2], fileName: match[3], group: match[4] || 'Other' }));
if (!demos.length) {
    throw new Error('No demos were found in src/Demos/Demos.tsx');
}
for (const demo of demos) {
    const source = `src/Demos/${demo.fileName}/${demo.fileName}.tsx`;
    if (!existsSync(path.join(root, source))) {
        throw new Error(`The demo source was not found: ${source}`);
    }
}
const demoGroups = [...new Set(demos.map((demo) => demo.group))].sort();
const demoReference = demoGroups.map((group) => {
    const rows = demos.filter((demo) => demo.group === group).map((demo) => [
        demo.title,
        `[Live demo](${site}/#${demo.path})`,
        `[TSX source](${raw}/src/Demos/${demo.fileName}/${demo.fileName}.tsx)`,
    ]);
    return `### ${group}\n\n${table(['Example', 'Demo', 'Source'], rows)}`;
}).join('\n\n');

const shortIndex = `# ka-table

> Free and customizable React data grid with sorting, filtering, grouping, tree data, editing, paging, and virtual scrolling. MIT licensed; React 18 or 19 is the only peer dependency.

Version: ${packageJson.version}.

## Machine-readable documentation

- [Complete Markdown reference](${site}/llms-full.txt): installation, usage, state rules, theming, generated API reference, actions, and links to every demo source.
- [Agent notes](${raw}/scripts/package/AGENTS.md): concise integration rules and correct package imports.

## Guides

- [Getting started](${docs}/docs_get_started.html)
- [Table and column props](${docs}/docs_props.html)
- [UI customization](${docs}/docs_ui.html)
- [Actions and state](${docs}/docs_action.html)
- [Hooks and utilities](${docs}/docs_hooks_utils.html)
- [Migration guide](${raw}/MIGRATION.md)
- [README](${raw}/README.md)

## Essential examples

- [Overview](${site}/#/overview): basic table setup.
- [Editing](${site}/#/editing): cell editing.
- [Remote data](${site}/#/remote-data): server-controlled data.
- [Virtual scrolling](${site}/#/many-rows): large datasets.
- [Custom cell](${site}/#/custom-cell): component customization.
- [All examples and TSX sources](${site}/llms-full.txt#examples)

## Project

- [GitHub repository](${repository})
- [npm package](https://www.npmjs.com/package/ka-table)
- [License: MIT](${raw}/LICENSE)
`;

const fullReference = `# ka-table

> Machine-readable documentation for ka-table ${packageJson.version}, generated from the package sources, TypeScript declarations, and JSDoc. React 18 or 19 is the only peer dependency. The package is MIT licensed.

Use this document together with the installed package types. The API reference and example links are also available separately at ${site}/llms.txt.

${section(readme, 'Installation')}

${section(readme, 'Usage')}

${section(agentNotes, 'Rules')}

${section(agentNotes, 'Imports')}

${section(readme, 'Theming')}

## API reference

This section is generated from the public TypeScript declarations. Cell values and row keys are \`unknown\`; narrow them or use the typed \`rowData\`. The row type is inferred from \`data\` or from \`useTable<Row>()\`.

### Enums

${enumReference}

### Type aliases

${aliasReference}

### Interfaces and classes

${declarationReference}

### Action creators

Actions can be dispatched through a table instance, \`dispatch\`, or the action creators exported from \`ka-table/actionCreators\`. A controlled table must apply actions with \`kaReducer\`.

${actionReference}

## Examples

Every example below links to its complete TSX source. When adapting a demo to a package import, replace its relative \`../../lib\` imports with the package paths listed in the Imports section.

${demoReference}

## Additional documentation

- [Hooks and utilities](${docs}/docs_hooks_utils.html)
- [Migration from 12.x](${raw}/MIGRATION.md)
- [Changelog](${raw}/CHANGELOG.md)
- [Agent notes](${raw}/scripts/package/AGENTS.md)
- [GitHub repository](${repository})
`;

const files = new Map([
    ['public/llms.txt', shortIndex],
    ['public/llms-full.txt', fullReference],
]);
const changed = [];
for (const [file, content] of files) {
    const filePath = path.join(root, file);
    const current = existsSync(filePath) ? readFileSync(filePath, 'utf8') : undefined;
    if (current !== content) {
        if (check) {
            changed.push(file);
        } else {
            writeFileSync(filePath, content);
            changed.push(file);
        }
    }
}
if (check && changed.length) {
    process.stderr.write(`Machine-readable documentation is outdated (run yarn docs:llms):\n${changed.map((file) => `- ${file}`).join('\n')}\n`);
    process.exitCode = 1;
} else {
    process.stdout.write(changed.length
        ? `${check ? 'Outdated' : 'Updated'}: ${changed.join(', ')}\n`
        : 'Machine-readable documentation matches the sources\n');
}

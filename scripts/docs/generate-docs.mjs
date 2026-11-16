// Generates the reference tables of the docs pages (ka-table-site/pages/docs) from the sources and their JSDoc.
// A table is written between the markers of its page; the text outside the markers is written by hand:
//
//   <!-- generated:start Column: ... -->
//   | Name | Type | Description |
//   ...
//   <!-- generated:end -->
//
// The order of the groups and of the rows of the page is kept: a new member goes to the end of its group (@group).
//
//   node scripts/docs/generate-docs.mjs [--docs <folder>] [--check]
//
//   --docs   the folder of the pages, ../ka-table-site/pages/docs by default
//   --check  changes nothing and fails when a table of a page differs from the code
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { allMembers, extractApi } from './api.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const docsOption = args.indexOf('--docs');
const docsDir = path.resolve(root, docsOption >= 0 ? args[docsOption + 1] : '../ka-table-site/pages/docs');
const check = args.includes('--check');

const api = extractApi(root);
const warnings = [];

const PROPS_SOURCE = 'https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts';
const DEMOS = 'https://komarovalexander.github.io/ka-table/#';
const demoPaths = new Set([...readFileSync(path.join(root, 'src/Demos/Demos.tsx'), 'utf8')
    .matchAll(/new Demo\(\w+, '(\/[^']+)'/g)].map((m) => m[1]));
// the actions which the table dispatches itself, but not in response to the events of the UI
const NOT_UI_ACTIONS = new Set(['clearSingleAction']);

// the sections of the pages which describe the declarations
const ANCHORS = {
    ITableProps: 'docs_props.html#table', Column: 'docs_props.html#column', EditableCell: 'docs_props.html#editablecell',
    Group: 'docs_props.html#group', GroupedColumn: 'docs_props.html#groupedcolumn', VirtualScrolling: 'docs_props.html#virtualscrolling',
    ChildComponents: 'docs_ui.html#childcomponents', ChildComponent: 'docs_ui.html#childcomponentt',
    ChildAttributesItem: 'docs_ui.html#childattributesitemt', AttributeTableData: 'docs_ui.html#attributetabledatat',
    ITableInstance: 'docs_hooks_utils.html#usetable', TableAction: 'docs_action.html#typescript', CustomAction: 'docs_action.html#custom-actions',
};

// a link from a page: the anchor of the same page or the relative link of another one
const href = (target, page) => {
    const [targetPage, anchor] = target.split('#');
    return targetPage === page.replace(/\.md$/, '.html') ? `#${anchor}` : `./${target}`;
};
const siteUrls = (text, page) => text.replace(/\]\(https:\/\/ka-table\.com\/([^)]+)\)/g, (_, target) => `](${href(target, page)})`);

const html = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\|/g, '&#124;');
const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#124;/g, '|').replace(/&amp;/g, '&');

// --- the types

// splits by a separator which is not inside brackets
const splitTop = (text, separator) => {
    const parts = [];
    let depth = 0;
    let current = '';
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if ('([{<'.includes(ch)) depth++;
        if (')]}'.includes(ch) || (ch === '>' && text[i - 1] !== '=')) depth--;
        if (ch === separator && depth === 0) {
            parts.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    parts.push(current.trim());
    return parts;
};

// NoInference<X> -> X, Bivariant<F> -> F; a function inside a bigger type keeps its parentheses: ((a) => number) | void
const unwrap = (text, wrapper) => {
    let result = text;
    let index;
    while ((index = result.search(new RegExp(`\\b${wrapper}<`))) >= 0) {
        let depth = 0;
        let end = index + wrapper.length;
        for (; end < result.length; end++) {
            if (result[end] === '<') depth++;
            if (result[end] === '>' && result[end - 1] !== '=') {
                depth--;
                if (depth === 0) break;
            }
        }
        const inner = result.slice(index + wrapper.length + 1, end);
        const whole = index === 0 && end === result.length - 1;
        const keep = !whole && /=>/.test(inner) && !/^\(.*\)$/.test(inner.trim()) ? `(${inner})` : inner;
        result = result.slice(0, index) + keep + result.slice(end + 1);
    }
    return result;
};

const isLibraryType = (name) => !!api.declarations[name] || !!api.aliases[name];
const clean = (type) => unwrap(unwrap(type, 'NoInference'), 'Bivariant')
    .replace(/\s+/g, ' ')
    // the type of the rows is described once on the pages: Column<TData> -> Column
    .replace(/\b(\w+)<TData>/g, (all, name) => (isLibraryType(name) ? name : all))
    .trim();
const dedupeUnion = (type) => [...new Set(splitTop(type, '|'))].join(' | ');

const enumValues = (name) => api.enums[name].members.map((m) => m.value || `'${m.name}'`);

// a small model of the library as its fields: { x?: number; y?: number; }
const inlineDeclaration = (name, depth = 0) => {
    const decl = api.declarations[name];
    if (!decl || ANCHORS[name] || depth > 1) {
        return undefined;
    }
    return `{ ${allMembers(api, name).map((m) => `${m.name}${m.optional ? '?' : ''}: ${expandNames(clean(m.type || 'unknown'), 6, depth + 1)};`).join(' ')} }`;
};

// the enums and the small models inside a type: InsertRowPosition -> ('before' | 'after')
const expandNames = (type, maxMembers, depth = 0) => type.replace(/\b[A-Z]\w*\b/g, (name, offset) => {
    if (type[offset + name.length] === '<' || type[offset - 1] === '.') {
        return name;
    }
    if (api.enums[name]) {
        return `(${enumValues(name).join(' | ')})`;
    }
    const decl = api.declarations[name];
    if (decl && allMembers(api, name).length <= maxMembers) {
        return inlineDeclaration(name, depth) || name;
    }
    return name;
});

// the type of a member as the code of a cell, the declarations with a section are links
const renderType = (rawType, page, { maxMembers = 6 } = {}) => {
    if (!rawType) {
        return '';
    }
    let type = dedupeUnion(clean(rawType));
    const single = type.match(/^(\w+)$/)?.[1];
    if (single && api.aliases[single] && !ANCHORS[single]) {
        const alias = clean(api.aliases[single].type);
        // a function (FormatFunc) and a simple type (Field, ControlledPropsKeys) are shown as their types
        if (/=>/.test(alias) || /^[\w\s()[\]|'"]+$/.test(alias)) {
            type = alias;
        }
    }
    // the values in <code>: Jekyll makes the quotes of the text typographic ('single' -> ‘single’)
    if (single && api.enums[single]) {
        return `<code>${enumValues(single).map(html).join('<br/>')}</code>`;
    }
    // a small model is shown as its fields, a field in a line
    if (single && api.declarations[single] && !ANCHORS[single] && allMembers(api, single).length <= maxMembers) {
        const fields = allMembers(api, single).map((m) => `${m.name}${m.optional ? '?' : ''}: ${expandNames(clean(m.type || 'unknown'), maxMembers, 1)};`);
        return `<code>{<br/>${fields.map(html).join('<br/>')}<br/>}</code>`;
    }
    // the names with a section are links: <code>(props: { column: </code>[<code>Column</code>](#column)<code> }) => ...</code>
    const whole = type.match(/^(\w+)(\[\])?$/);
    if (whole && ANCHORS[whole[1]]) {
        return `[<code>${html(type)}</code>](${href(ANCHORS[whole[1]], page)})`;
    }
    let result = '';
    let last = 0;
    for (const m of type.matchAll(/\b[A-Z]\w*\b/g)) {
        if (ANCHORS[m[0]]) {
            const before = type.slice(last, m.index);
            result += `${before ? `<code>${html(before)}</code>` : ''}[<code>${m[0]}</code>](${href(ANCHORS[m[0]], page)})`;
            last = m.index + m[0].length;
        }
    }
    const rest = type.slice(last);
    return result + (rest ? `<code>${html(rest)}</code>` : '');
};

// --- the descriptions

const demosOf = (label, jsdoc) => (jsdoc?.tags || []).filter((t) => t.tag === 'see').flatMap((t) => {
    const link = t.text.match(/\{@link\s+(\S+)\s*\|\s*([^}]+)\}/);
    if (!link) {
        warnings.push(`${label}: @see without {@link url | title}: ${t.text}`);
        return [];
    }
    if (link[1].startsWith(DEMOS) && !demoPaths.has(link[1].slice(DEMOS.length))) {
        warnings.push(`${label}: the demo ${link[1]} is not in src/Demos/Demos.tsx`);
    }
    return [{ url: link[1], title: link[2].trim() }];
});
const demoList = (demos) => demos.map((d) => `[${d.title}](${d.url})`).join(', ');

// the text of a cell: the paragraphs of JSDoc are lines, the code with | is a <code> (| would split the cell)
const cellText = (text, page) => siteUrls(text
    .split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
    .map((p) => p.split(/(`[^`]+`)/).map((part) => (/^`[^`]+`$/.test(part)
        ? (part.includes('|') ? `<code>${html(part.slice(1, -1))}</code>` : part)
        : part.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\|/g, '&#124;'))).join(''))
    .join(' <br/>'), page);

const description = (label, jsdoc, page) => {
    if (!jsdoc?.text) {
        warnings.push(`${label}: no description in JSDoc`);
    }
    const demos = demosOf(label, jsdoc);
    return [cellText(jsdoc?.text || '', page), demos.length ? `(Demo: ${demoList(demos)})` : ''].filter(Boolean).join(' ');
};

const tagOf = (jsdoc, tag) => jsdoc?.tags.find((t) => t.tag === tag)?.text.trim();

// --- the tables

// the rows in the order of the page: [{ name, rows: [keys] }], the new groups and rows go to the end
const ordered = (rows, order) => {
    const groups = [];
    const groupOf = (name) => {
        let group = groups.find((g) => g.name === name);
        if (!group) {
            group = { name, rows: [] };
            groups.push(group);
        }
        return group;
    };
    order.forEach((g) => groupOf(g.name));
    for (const row of rows) {
        groupOf(row.group).rows.push(row);
    }
    for (const group of groups) {
        const keys = order.find((g) => g.name === group.name)?.rows || [];
        const position = (row) => (keys.includes(row.key) ? keys.indexOf(row.key) : keys.length);
        group.rows = group.rows.map((row, index) => ({ row, index }))
            .sort((a, b) => position(a.row) - position(b.row) || a.index - b.index)
            .map((r) => r.row);
    }
    return groups.filter((g) => g.rows.length);
};

const table = (header, rows) => [header, header.replace(/[^|]+/g, ' --- ').trim(), ...rows.map((r) => r.line)].join('\n');

const render = (rows, order, header, grouped) => {
    const groups = ordered(rows, order);
    return grouped
        ? groups.map((g) => `### ${g.name}\n\n${table(header, g.rows)}`).join('\n\n')
        : table(header, groups.flatMap((g) => g.rows));
};

const propsTable = (page, declarations, { grouped = false } = {}) => (order) => {
    const members = declarations.flatMap((name, i) => (i === 0 ? allMembers(api, name) : api.declarations[name].members));
    const rows = members.map((m) => {
        const label = `${declarations[0]}.${m.name}`;
        const group = grouped ? tagOf(m.jsdoc, 'group') : '';
        if (grouped && !group) {
            warnings.push(`${label}: no @group, the row goes to the group "Other"`);
        }
        return {
            key: m.name,
            group: group ?? 'Other',
            line: `| ${m.name} | ${renderType(m.type, page)} | ${description(label, m.jsdoc, page)} |`,
        };
    });
    return render(rows, order, '| Name | Type | Description |', grouped);
};

const childComponentsTable = (order) => {
    const page = 'docs_ui.md';
    const rows = allMembers(api, 'ChildComponents').map((m) => {
        const label = `ChildComponents.${m.name}`;
        const props = clean(m.type.match(/^ChildComponent<(.+)>$/)?.[1] || m.type);
        const propsLink = /^ITableProps\b/.test(props)
            ? `[ITableProps](${href(ANCHORS.ITableProps, page)})`
            : `[${html(props)}](${PROPS_SOURCE}){:target="_blank"}`;
        const element = tagOf(m.jsdoc, 'element');
        if (!element) {
            warnings.push(`${label}: no @element`);
        }
        return {
            key: m.name,
            group: '',
            line: `| ${m.name} | [<code>ChildComponent</code>](${href(ANCHORS.ChildComponent, page)})<${propsLink}> | ${element || ''} | ${demoList(demosOf(label, m.jsdoc))} |`,
        };
    });
    return render(rows, order, '| Name | Type | Element | Demo |', false);
};

const actionsTable = (order) => {
    const page = 'docs_action.md';
    const actionTypes = new Map(api.enums.ActionType.members.map((m) => [m.name, m.value]));
    const rows = api.actions.map((a) => {
        const label = `actionCreators.${a.name}`;
        const type = actionTypes.get(a.actionType);
        if (!type) {
            warnings.push(`${label}: the type of the action is unknown`);
        }
        const fields = a.fields.map((f) => {
            if (!f.type) {
                warnings.push(`${label}: the type of the field ${f.name} is unknown`);
            }
            return `${f.name}${f.optional ? '?' : ''}: ${html(expandNames(clean(f.type || 'unknown'), 2))}`;
        });
        const group = tagOf(a.jsdoc, 'group');
        if (!group) {
            warnings.push(`${label}: no @group, the row goes to the group "Other"`);
        }
        const parameters = a.parameters.map((p) => `${p.name}${p.optional ? '?' : ''}`).join(', ');
        const creator = `<code class="creator">${a.name}(${parameters ? `<wbr/>${parameters}` : ''})</code>`;
        const ui = api.uiActions.has(a.name) && !NOT_UI_ACTIONS.has(a.name) ? 'yes' : 'no';
        return {
            key: a.name,
            group: group ?? 'Other',
            // code.action and code.creator break at the spaces, not inside the names (css/customstyles.css of the site)
            line: `| <code class="action">${html(type || '')}</code><br/>${creator} | <code class="action">{<br/>${[`type: ${html(type || '')}`, ...fields].join(',<br/>')}<br/>}</code> | ${ui} | ${description(label, a.jsdoc, page)} |`,
        };
    });
    return render(rows, order, '| Type and action creator | Action | UI | kaReducer |', true);
};

const membersTable = (page, declaration, rename = {}) => (order) => {
    const rows = allMembers(api, declaration).map((m) => {
        let type = m.type;
        for (const [from, to] of Object.entries(rename)) {
            type = type?.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
        }
        return {
            key: m.name,
            group: '',
            line: `| ${m.name} | ${renderType(type, page)} | ${description(`${declaration}.${m.name}`, m.jsdoc, page)} |`,
        };
    });
    return render(rows, order, '| Name | Type | Description |', false);
};

// the key of a row of a page: the name in the first cell, the action creator of an action
const rowKey = (line) => {
    const creator = line.match(/class="creator">(\w+)\(/);
    if (creator) {
        return creator[1];
    }
    const name = decode(line.split('|')[1] || '').replace(/<a name=.*?<\/a>/g, '').replace(/<[^>]+>/g, '').trim();
    return name === 'Name' || name.startsWith('Type and') ? undefined : name;
};

const PAGES = {
    'docs_props.md': {
        Table: { source: 'ITableProps and IKaTableProps in src/lib/Components/Table/Table.tsx', render: propsTable('docs_props.md', ['ITableProps', 'IKaTableProps'], { grouped: true }) },
        Column: { source: 'src/lib/Models/Column.ts', render: propsTable('docs_props.md', ['Column']) },
        EditableCell: { source: 'src/lib/Models/EditableCell.ts and Cell.ts', render: propsTable('docs_props.md', ['EditableCell']) },
        Group: { source: 'src/lib/Models/Group.ts', render: propsTable('docs_props.md', ['Group']) },
        GroupedColumn: { source: 'src/lib/Models/GroupedColumn.ts', render: propsTable('docs_props.md', ['GroupedColumn']) },
        VirtualScrolling: { source: 'src/lib/Models/VirtualScrolling.ts', render: propsTable('docs_props.md', ['VirtualScrolling']) },
    },
    'docs_ui.md': {
        ChildComponents: { source: 'src/lib/Models/ChildComponents.ts', render: childComponentsTable },
        ChildComponent: { source: 'src/lib/Models/ChildComponent.ts', render: membersTable('docs_ui.md', 'ChildComponent', { TProps: 'T' }) },
        AttributeTableData: { source: 'src/lib/Models/AttributeTableData.ts', render: membersTable('docs_ui.md', 'AttributeTableData') },
    },
    'docs_action.md': {
        actions: { source: 'src/lib/actionCreators.ts', render: actionsTable },
    },
};

// --- the pages

const MARKERS = /<!-- generated:start (\w+)\b[^\n]*?-->\n([\s\S]*?)<!-- generated:end -->/g;

const existingOrder = (content) => {
    const groups = [{ name: '', rows: [] }];
    for (const line of content.split('\n')) {
        const heading = line.match(/^###\s+(.+)$/);
        if (heading) {
            groups.push({ name: decode(heading[1]).trim(), rows: [] });
        } else if (line.startsWith('|') && !/^\|\s*-{3}/.test(line)) {
            const key = rowKey(line);
            if (key) {
                groups[groups.length - 1].rows.push(key);
            }
        }
    }
    return groups.filter((g) => g.name || g.rows.length);
};

const differences = [];
const written = [];
let failed = false;
for (const [file, blocks] of Object.entries(PAGES)) {
    const pagePath = path.join(docsDir, file);
    const text = readFileSync(pagePath, 'utf8');
    const found = new Set();
    const result = text.replace(MARKERS, (all, id, content) => {
        const block = blocks[id];
        if (!block) {
            warnings.push(`${file}: no table with the id ${id}`);
            return all;
        }
        found.add(id);
        let body = block.render(existingOrder(content));
        if (/\{\{|\{%/.test(body)) {
            // Jekyll would take them for the tags of Liquid
            body = `{% raw %}\n${body}\n{% endraw %}`;
        }
        const generated = `<!-- generated:start ${id}: from the JSDoc of ${block.source}, edit it and run yarn docs -->\n\n${body}\n\n<!-- generated:end -->`;
        if (generated !== all) {
            const before = content.trim().split('\n');
            const after = body.split('\n');
            const line = after.findIndex((l, i) => l !== before[i]);
            differences.push(`${file}: ${id}${line >= 0 ? `, line ${line + 1} of the table:\n    page: ${before[line] ?? '(none)'}\n    code: ${after[line]}` : ''}`);
        }
        return generated;
    });
    for (const id of Object.keys(blocks)) {
        if (!found.has(id)) {
            failed = true;
            process.stderr.write(`${file}: no markers of ${id} (<!-- generated:start ${id} --> ... <!-- generated:end -->)\n`);
        }
    }
    if (!check && result !== text) {
        writeFileSync(pagePath, result);
        written.push(file);
    }
}

for (const warning of warnings) {
    process.stderr.write(`warning: ${warning}\n`);
}
if (check) {
    if (differences.length) {
        process.stderr.write(`The tables of the pages differ from the code (yarn docs updates them):\n${differences.map((d) => `- ${d}`).join('\n')}\n`);
        failed = true;
    } else {
        process.stdout.write('The tables of the pages match the code\n');
    }
} else {
    process.stdout.write(written.length ? `Updated: ${written.join(', ')}\n` : 'The tables of the pages match the code\n');
}
process.exitCode = failed ? 1 : 0;

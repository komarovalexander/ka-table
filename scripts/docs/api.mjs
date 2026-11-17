// The public API of ka-table, read from the sources by the TypeScript compiler API (the syntax only, without type checking):
// the members of the interfaces and the classes, the action creators with the fields of their actions,
// the enums and the type aliases, with their JSDoc.
import { createRequire } from 'node:module';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

export const loadTypeScript = (root) => createRequire(path.join(root, 'package.json'))(process.env.TYPESCRIPT_PATH || 'typescript');

const parse = (ts, file, text) => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);

const jsDocOf = (ts, node) => {
    const docs = ts.getJSDocCommentsAndTags(node).filter((d) => ts.isJSDoc(d));
    if (!docs.length) {
        return undefined;
    }
    const doc = docs[docs.length - 1];
    return {
        text: ts.getTextOfJSDocComment(doc.comment) || '',
        tags: (doc.tags || []).map((t) => ({ tag: t.tagName.text, text: ts.getTextOfJSDocComment(t.comment) || '' })),
    };
};

const nameOf = (sf, node) => node.name && node.name.getText(sf).replace(/^['"]|['"]$/g, '');

const isExported = (ts, node) => !!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

// the fields of the action which a creator returns: a field which is a parameter has the type of the parameter,
// a field which reads a member of a parameter (settings && settings.validate) has the type of this member
const actionFields = (ts, sf, parameters, body) => {
    const fields = [];
    let actionType;
    for (const property of body.properties) {
        const name = nameOf(sf, property);
        if (name === 'type') {
            const value = ts.isPropertyAssignment(property) ? property.initializer.getText(sf) : '';
            actionType = value.replace(/\s+as\s+const$/, '').replace(/^ActionType\./, '');
            continue;
        }
        const parameter = parameters.find((p) => p.name === (ts.isShorthandPropertyAssignment(property) ? name : property.initializer?.getText(sf)));
        if (parameter) {
            fields.push({ name, optional: parameter.optional, type: parameter.type, order: parameters.indexOf(parameter) });
            continue;
        }
        let member;
        const visit = (node) => {
            if (!member && ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
                const owner = parameters.find((p) => p.name === node.expression.text);
                const literal = owner?.typeNode && ts.isTypeLiteralNode(owner.typeNode) ? owner.typeNode : undefined;
                const found = literal?.members.find((m) => nameOf(sf, m) === node.name.text);
                if (found) {
                    member = { name, optional: true, type: found.type?.getText(sf), order: parameters.indexOf(owner) };
                }
            }
            ts.forEachChild(node, visit);
        };
        visit(property);
        fields.push(member || { name, optional: false, type: undefined, order: parameters.length });
    }
    return { fields: fields.sort((a, b) => a.order - b.order), actionType };
};

export const extractApi = (root) => {
    const ts = loadTypeScript(root);
    const lib = path.join(root, 'src/lib');
    const files = [
        'Components/Table/Table.tsx', 'types.ts', 'props.ts', 'actionCreators.ts', 'enums.ts', 'Utils/NavigationUtils.ts',
        ...readdirSync(path.join(lib, 'Models')).filter((f) => f.endsWith('.ts')).map((f) => `Models/${f}`),
    ];
    const api = { declarations: {}, aliases: {}, actions: [], enums: {} };
    for (const file of files) {
        const sf = parse(ts, file, readFileSync(path.join(lib, file), 'utf8'));
        for (const st of sf.statements) {
            if ((ts.isInterfaceDeclaration(st) || ts.isClassDeclaration(st)) && st.name) {
                api.declarations[st.name.text] = {
                    kind: ts.isClassDeclaration(st) ? 'class' : 'interface',
                    exported: isExported(ts, st),
                    file,
                    extends: (st.heritageClauses || []).flatMap((h) => h.types.map((t) => t.expression.getText(sf))),
                    members: st.members
                        .filter((m) => ts.isPropertySignature(m) || ts.isPropertyDeclaration(m) || ts.isMethodSignature(m))
                        .map((m) => ({
                            name: nameOf(sf, m),
                            optional: !!m.questionToken,
                            type: ts.isMethodSignature(m)
                                ? `(${m.parameters.map((p) => p.getText(sf)).join(', ')}) => ${m.type ? m.type.getText(sf) : 'void'}`
                                : m.type?.getText(sf),
                            jsdoc: jsDocOf(ts, m),
                        })),
                };
            } else if (ts.isTypeAliasDeclaration(st)) {
                api.aliases[st.name.text] = { exported: isExported(ts, st), file, type: st.type.getText(sf) };
            } else if (ts.isEnumDeclaration(st)) {
                api.enums[st.name.text] = {
                    exported: isExported(ts, st),
                    file,
                    members: st.members.map((m) => ({ name: m.name.getText(sf), value: m.initializer?.getText(sf) })),
                };
            } else if (file === 'actionCreators.ts' && ts.isVariableStatement(st) && isExported(ts, st)) {
                for (const d of st.declarationList.declarations) {
                    const init = d.initializer;
                    if (!init || !(ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
                        continue;
                    }
                    const parameters = init.parameters.map((p) => ({
                        name: p.name.getText(sf),
                        optional: !!p.questionToken || !!p.initializer,
                        type: p.type?.getText(sf),
                        typeNode: p.type,
                    }));
                    let body = init.body;
                    if (ts.isBlock(body)) {
                        body = body.statements.find((s) => ts.isReturnStatement(s))?.expression;
                    }
                    while (body && ts.isParenthesizedExpression(body)) {
                        body = body.expression;
                    }
                    const { fields, actionType } = body && ts.isObjectLiteralExpression(body)
                        ? actionFields(ts, sf, parameters, body) : { fields: [], actionType: undefined };
                    api.actions.push({
                        name: d.name.getText(sf),
                        parameters: parameters.map(({ typeNode, ...p }) => p),
                        fields,
                        actionType,
                        jsdoc: jsDocOf(ts, st),
                    });
                }
            }
        }
    }
    api.uiActions = uiActionCreators(ts, lib);
    return api;
};

// the members of a declaration with the members of the declarations of the library which it extends
export const allMembers = (api, name, seen = new Set()) => {
    const decl = api.declarations[name];
    if (!decl || seen.has(name)) {
        return [];
    }
    seen.add(name);
    const inherited = decl.extends.flatMap((e) => allMembers(api, e, seen));
    return [...decl.members, ...inherited.filter((m) => !decl.members.some((own) => own.name === m.name))];
};

// the action creators which the library imports by name (the components, the hooks, the utils): the table dispatches
// these actions itself. A namespace import (import * as actionCreators) only builds the methods and the types of the instance
const uiActionCreators = (ts, lib) => {
    const names = new Set();
    const walk = (dir) => {
        for (const entry of readdirSync(dir)) {
            const full = path.join(dir, entry);
            if (statSync(full).isDirectory()) {
                if (entry !== 'Namespaces') {
                    walk(full);
                }
            } else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) && full !== path.join(lib, 'actionCreators.ts')) {
                const sf = parse(ts, entry, readFileSync(full, 'utf8'));
                for (const st of sf.statements) {
                    const bindings = ts.isImportDeclaration(st) && /(^|\/)actionCreators$/.test(st.moduleSpecifier.text) && st.importClause?.namedBindings;
                    if (bindings && ts.isNamedImports(bindings)) {
                        bindings.elements.forEach((e) => names.add((e.propertyName || e.name).text));
                    }
                }
            }
        }
    };
    walk(lib);
    return names;
};

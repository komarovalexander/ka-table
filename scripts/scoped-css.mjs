/*
 * Scopes a stylesheet to a selector, without dependencies.
 *
 * scopeCss() prepends the prefixes to every selector of a stylesheet; ':root'
 * (and ':host') become the prefix itself, so the custom properties declared on
 * :root are declared on the scope element instead. Nested at-rules (@media,
 * @supports, @layer, ...) are processed recursively; @keyframes, @font-face and
 * the like are copied verbatim.
 *
 * scopedCss() is the Vite plugin of the demo site (see vite.config.mts): the
 * stylesheets listed by their path are scoped when they are imported, as the
 * nested Sass @import used to do - the ka-table theme to .enable-ka-styles and
 * .print-content (the Bootstrap demo doesn't use it, the print demo copies
 * .print-content into the print window) and bootstrap.css to .bootstrap-demo.
 */

const NESTED_AT_RULES = ['media', 'supports', 'layer', 'container', 'document', 'scope'];

/**
 * Splits `text` by `separator` ignoring the separators inside strings, comments and brackets.
 */
export const splitTopLevel = (text, separator) => {
    const parts = [];
    let current = '';
    let depth = 0;
    let quote = null;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (quote) {
            current += ch;
            if (ch === '\\') {
                current += text[++i] || '';
            } else if (ch === quote) {
                quote = null;
            }
            continue;
        }
        if (ch === '/' && text[i + 1] === '*') {
            const end = text.indexOf('*/', i + 2);
            const stop = end === -1 ? text.length : end + 2;
            current += text.slice(i, stop);
            i = stop - 1;
            continue;
        }
        if (ch === '"' || ch === '\'') {
            quote = ch;
        } else if (ch === '(' || ch === '[') {
            depth++;
        } else if (ch === ')' || ch === ']') {
            depth--;
        }
        if (ch === separator && depth === 0) {
            parts.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    parts.push(current);
    return parts;
};

/**
 * Returns the index of the '}' which closes the '{' at `openIndex`.
 */
const findBlockEnd = (css, openIndex) => {
    let depth = 0;
    let quote = null;
    for (let i = openIndex; i < css.length; i++) {
        const ch = css[i];
        if (quote) {
            if (ch === '\\') {
                i++;
            } else if (ch === quote) {
                quote = null;
            }
            continue;
        }
        if (ch === '/' && css[i + 1] === '*') {
            const end = css.indexOf('*/', i + 2);
            i = end === -1 ? css.length : end + 1;
            continue;
        }
        if (ch === '"' || ch === '\'') {
            quote = ch;
        } else if (ch === '{') {
            depth++;
        } else if (ch === '}') {
            depth--;
            if (depth === 0) {
                return i;
            }
        }
    }
    throw new Error('Unbalanced braces in the css');
};

const scopeSelectorList = (selectorList, prefixes, rootSelectors) => {
    const scoped = [];
    splitTopLevel(selectorList, ',').forEach((rawSelector) => {
        const selector = rawSelector.trim();
        if (!selector) {
            return;
        }
        prefixes.forEach((prefix) => {
            const result = rootSelectors.includes(selector) ? prefix : `${prefix} ${selector}`;
            if (!scoped.includes(result)) {
                scoped.push(result);
            }
        });
    });
    return scoped.join(',\n');
};

/**
 * Prepends `prefixes` to every selector of `css`.
 * @param {string} css the stylesheet
 * @param {string[]} prefixes the scope selectors, e.g. ['.my-scope']
 * @param {string[]} rootSelectors the selectors which become the prefix itself
 */
export const scopeCss = (css, prefixes, rootSelectors = [':root', ':host']) => {
    let output = '';
    let i = 0;
    while (i < css.length) {
        const ch = css[i];
        if (/\s/.test(ch)) {
            output += ch;
            i++;
            continue;
        }
        if (ch === '/' && css[i + 1] === '*') {
            const end = css.indexOf('*/', i + 2);
            const stop = end === -1 ? css.length : end + 2;
            output += css.slice(i, stop);
            i = stop;
            continue;
        }
        // the prelude: up to '{' or ';' (a statement at-rule)
        let j = i;
        let quote = null;
        let depth = 0;
        while (j < css.length) {
            const c = css[j];
            if (quote) {
                if (c === '\\') {
                    j++;
                } else if (c === quote) {
                    quote = null;
                }
            } else if (c === '"' || c === '\'') {
                quote = c;
            } else if (c === '(') {
                depth++;
            } else if (c === ')') {
                depth--;
            } else if (depth === 0 && (c === '{' || c === ';')) {
                break;
            }
            j++;
        }
        if (j >= css.length || css[j] === ';') {
            // a statement at-rule (@import, @charset, ...): copied as is
            output += css.slice(i, Math.min(j + 1, css.length));
            i = j + 1;
            continue;
        }
        const prelude = css.slice(i, j).trim();
        const blockEnd = findBlockEnd(css, j);
        const body = css.slice(j + 1, blockEnd);
        if (prelude.startsWith('@')) {
            const name = prelude.slice(1).split(/[\s({]/)[0].toLowerCase();
            if (NESTED_AT_RULES.includes(name)) {
                output += `${prelude} {${scopeCss(body, prefixes, rootSelectors)}}`;
            } else {
                output += `${prelude} {${body}}`;
            }
        } else {
            output += `${scopeSelectorList(prelude, prefixes, rootSelectors)} {${body}}`;
        }
        i = blockEnd + 1;
    }
    return output;
};

/**
 * Vite plugin: scopes the stylesheets whose path ends with a key of `scopes` to its prefixes.
 * @param {Record<string, string[]>} scopes e.g. { 'src/lib/style.css': ['.enable-ka-styles'] }
 */
export const scopedCss = (scopes) => ({
    name: 'ka-table:scoped-css',
    enforce: 'pre',
    transform(code, id) {
        const file = id.split('?')[0];
        const entry = Object.entries(scopes).find(([path]) => file.endsWith(`/${path}`));
        if (!entry) {
            return null;
        }
        const css = code
            .replace(/^﻿?\s*@charset[^;]*;/, '')
            .replace(/\/\*# sourceMappingURL=[^*]*\*\/\s*$/, '');
        return { code: scopeCss(css, entry[1]), map: null };
    },
});

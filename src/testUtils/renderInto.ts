import { RenderOptions, RenderResult, render } from '@testing-library/react';

import { ReactElement } from 'react';

type TableElementTag = 'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'colgroup';

/**
 * Renders a part of a table (a row, a cell, a col) into a parent element of the right type,
 * so that React does not warn about invalid DOM nesting.
 */
export const renderInto = (
    tagName: TableElementTag,
    ui: ReactElement,
    options?: Omit<RenderOptions, 'container'>
): RenderResult => render(ui, {
    ...options,
    container: document.body.appendChild(document.createElement(tagName)),
});

import * as React from 'react';

import { FilteringMode, SortDirection, SortingMode } from '../../enums';
import { IKaTableProps, Table } from '../..';
import { act, fireEvent, render, screen, within } from '@testing-library/react';

import axe from 'axe-core';

const data = [
    { id: 1, name: 'Mike', country: 'USA', parent: null },
    { id: 2, name: 'Tom', country: 'USA', parent: 1 },
    { id: 3, name: 'Anna', country: 'France', parent: null },
];
const columns = [{ key: 'name', title: 'Name' }, { key: 'country', title: 'Country' }];
const tableProps: IKaTableProps = { columns, data, rowKeyField: 'id' };

const pressEnter = (element: Element) => fireEvent.keyDown(element, { key: 'Enter' });
const pressSpace = (element: Element) => {
    fireEvent.keyDown(element, { key: ' ' });
    fireEvent.keyUp(element, { key: ' ' });
};
const getRowsText = (container: HTMLElement) => Array.from(container.querySelectorAll('tbody tr')).map((row) => row.textContent);

describe('Table accessibility', () => {
    it('sorts by the title from the keyboard, aria-sort is set for the sorted column', () => {
        render(<Table {...tableProps} sortingMode={SortingMode.Single} />);
        const title = screen.getByRole('button', { name: 'Name' });
        const headCell = title.closest('th')!;
        expect(headCell.getAttribute('aria-sort')).toBeNull();

        pressEnter(title);
        expect(headCell.getAttribute('aria-sort')).toBe('ascending');
        pressSpace(title);
        expect(headCell.getAttribute('aria-sort')).toBe('descending');
        expect(screen.getByRole('button', { name: 'Country' }).closest('th')!.getAttribute('aria-sort')).toBeNull();
    });
    it('does not make the titles buttons without sorting', () => {
        render(<Table {...tableProps} />);
        expect(screen.queryByRole('button')).toBeNull();
    });
    it('expands groups from the keyboard', () => {
        const { container } = render(<Table {...tableProps} groups={[{ columnKey: 'country' }]} />);
        const groupButton = screen.getByRole('button', { name: 'Country: USA' });
        expect(groupButton.getAttribute('aria-expanded')).toBe('true');

        pressEnter(groupButton);
        expect(groupButton.getAttribute('aria-expanded')).toBe('false');
        expect(getRowsText(container)).not.toContain('Mike');
    });
    it('expands tree rows from the keyboard', () => {
        const { container } = render(<Table {...tableProps} treeGroupKeyField='parent' />);
        const treeButton = screen.getByRole('button', { name: 'Mike' });
        expect(treeButton.getAttribute('aria-expanded')).toBe('true');

        pressSpace(treeButton);
        expect(treeButton.getAttribute('aria-expanded')).toBe('false');
        expect(getRowsText(container).join()).not.toContain('Tom');
    });
    it('changes pages and page sizes from the keyboard', () => {
        const { container } = render(<Table {...tableProps} paging={{ enabled: true, pageSize: 1, pageSizes: [1, 2] }} />);
        const pages = within(container.querySelector<HTMLElement>('.ka-paging-pages')!);
        expect(pages.getByRole('button', { name: '1' }).getAttribute('aria-current')).toBe('page');

        pressEnter(pages.getByRole('button', { name: '2' }));
        expect(pages.getByRole('button', { name: '2' }).getAttribute('aria-current')).toBe('page');
        expect(pages.getByRole('button', { name: '1' }).getAttribute('aria-current')).toBeNull();
        expect(getRowsText(container)).toEqual(['TomUSA']);

        const sizes = within(container.querySelector<HTMLElement>('.ka-paging-sizes')!);
        expect(sizes.getByRole('button', { name: '1' }).getAttribute('aria-pressed')).toBe('true');
        pressEnter(sizes.getByRole('button', { name: '2' }));
        expect(sizes.getByRole('button', { name: '2' }).getAttribute('aria-pressed')).toBe('true');
    });
    it('ungroups from the keyboard in the group panel', () => {
        const { container } = render(<Table {...tableProps} groups={[{ columnKey: 'country' }]} groupPanel={{ enabled: true }} />);
        pressEnter(screen.getByRole('button', { name: 'Ungroup Country' }));
        expect(container.querySelector('.ka-group-row')).toBeNull();
    });
    it('marks the selected rows', () => {
        const { container } = render(<Table {...tableProps} selectedRows={[1]} />);
        const rows = container.querySelectorAll('tbody tr');
        expect(rows[0].getAttribute('aria-selected')).toBe('true');
        expect(rows[1].getAttribute('aria-selected')).toBeNull();
    });
    it('names the inputs of the filter row and the editors by the column titles', () => {
        render(<Table {...tableProps} filteringMode={FilteringMode.FilterRow} editableCells={[{ columnKey: 'name', rowKeyValue: 1 }]} />);
        expect(screen.getByRole('searchbox', { name: 'Name' })).toBeDefined();
        expect(screen.getByRole('textbox', { name: 'Name' })).toBeDefined();
    });
    it('keeps the focus in the header filter popup, closes it by Esc and returns the focus', () => {
        render(<Table {...tableProps} filteringMode={FilteringMode.HeaderFilter} />);
        const filterButton = screen.getByRole('button', { name: 'Filter Name' });
        expect(filterButton.getAttribute('aria-haspopup')).toBe('dialog');
        expect(filterButton.getAttribute('aria-expanded')).toBe('false');

        filterButton.focus();
        pressEnter(filterButton);
        const dialog = screen.getByRole('dialog', { name: 'Filter Name' });
        expect(filterButton.getAttribute('aria-expanded')).toBe('true');
        const checkboxes = within(dialog).getAllByRole('checkbox');
        expect(checkboxes.map((checkbox) => checkbox.getAttribute('aria-label'))).toEqual(['Mike', 'Tom', 'Anna']);
        expect(document.activeElement).toBe(checkboxes[0]);

        const lastCheckbox = checkboxes[checkboxes.length - 1];
        // the checkbox editor closes its editor on blur
        act(() => lastCheckbox.focus());
        fireEvent.keyDown(lastCheckbox, { key: 'Tab' });
        expect(document.activeElement).toBe(checkboxes[0]);
        fireEvent.keyDown(checkboxes[0], { key: 'Tab', shiftKey: true });
        expect(document.activeElement).toBe(lastCheckbox);

        fireEvent.keyDown(lastCheckbox, { key: 'Escape' });
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(document.activeElement).toBe(filterButton);
    });

    const axeConfigurations: [string, Partial<IKaTableProps>][] = [
        ['sorting', { sortingMode: SortingMode.Single, columns: [{ ...columns[0], sortDirection: SortDirection.Ascend }, columns[1]] }],
        ['grouping with the group panel', { groups: [{ columnKey: 'country' }], groupPanel: { enabled: true } }],
        ['tree', { treeGroupKeyField: 'parent' }],
        ['paging', { paging: { enabled: true, pageSize: 1, pageSizes: [1, 2] } }],
        ['header filter popup', { filteringMode: FilteringMode.HeaderFilter, columns: [{ ...columns[0], isHeaderFilterPopupShown: true }, columns[1]] }],
        ['filter row', { filteringMode: FilteringMode.FilterRow }],
        ['editors', { editableCells: [{ columnKey: 'name', rowKeyValue: 1 }] }],
        ['selection', { selectedRows: [1] }],
    ];
    it.each(axeConfigurations)('has no violations found by axe: %s', async (_, props) => {
        const { container } = render(<Table {...tableProps} {...props} />);
        const results = await axe.run(container, {
            // there is no layout in jsdom, a single table is not a page
            rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
        });
        expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.html).join(', ')}`)).toEqual([]);
    });
});

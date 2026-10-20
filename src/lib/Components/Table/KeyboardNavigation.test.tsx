import * as React from 'react';

import { EditingMode, SortingMode } from '../../enums';
import { IKaTableProps, ITableInstance, Table } from '../..';
import { act, fireEvent, render, screen } from '@testing-library/react';

import axe from 'axe-core';
import { useTable } from '../../hooks/UseTable';

const createData = (count: number) => Array.from({ length: count }, (_, index) => ({
    id: index, name: `name ${index}`, city: `city ${index}`, group: index < 2 ? 'a' : 'b', parentId: index === 0 ? null : 0,
}));
const columns = [{ key: 'name', title: 'Name' }, { key: 'city', title: 'City' }];

const setup = (tableProps: Partial<IKaTableProps> = {}) => {
    let table: ITableInstance;
    const props: IKaTableProps = { columns, data: createData(5), rowKeyField: 'id', ...tableProps };
    const TableWithInstance = () => {
        table = useTable();
        return <Table table={table} {...props} />;
    };
    const result = render(<TableWithInstance />);
    const getCell = (text: string) => screen.getByText(text).closest('td')!;
    const focusCell = (text: string) => act(() => getCell(text).focus());
    const press = (key: string, options = {}) => {
        fireEvent.keyDown(document.activeElement!, { key, ...options });
        fireEvent.keyUp(document.activeElement!, { key, ...options });
    };
    const getFocusedText = () => document.activeElement?.textContent;
    return { ...result, focusCell, getCell, getFocusedText, press, table: () => table };
};

describe('keyboardNavigation', () => {
    it('is enabled by default: the table is a grid with a single stop of Tab', () => {
        const { container } = setup();
        expect(container.querySelector('table')!.getAttribute('role')).toBe('grid');
        const tabStops = container.querySelectorAll('tbody td[tabindex="0"]');
        expect(Array.from(tabStops).map((cell) => cell.textContent)).toEqual(['name 0']);
        expect(container.querySelectorAll('tbody td[tabindex="-1"]').length).toBe(9);
    });
    it('is turned off by keyboardNavigation: false', () => {
        const { container } = setup({ keyboardNavigation: false });
        expect(container.querySelector('table')!.getAttribute('role')).toBeNull();
        expect(container.querySelectorAll('td[tabindex]').length).toBe(0);
    });
    it('makes the cell focused by a click or Tab', () => {
        const { focusCell, getCell, table } = setup();
        focusCell('city 2');
        expect(table().props.focused).toEqual({ cell: { columnKey: 'city', rowKeyValue: 2 } });
        expect(getCell('city 2').tabIndex).toBe(0);
        expect(getCell('name 0').tabIndex).toBe(-1);
    });
    it('moves the focus by the arrows, Home and End', () => {
        const { focusCell, getFocusedText, press, table } = setup();
        focusCell('name 1');
        press('ArrowRight');
        expect(getFocusedText()).toBe('city 1');
        expect(table().props.focused).toEqual({ cell: { columnKey: 'city', rowKeyValue: 1 } });
        press('ArrowRight');
        expect(getFocusedText()).toBe('city 1');
        press('ArrowDown');
        expect(getFocusedText()).toBe('city 2');
        press('ArrowLeft');
        expect(getFocusedText()).toBe('name 2');
        press('ArrowUp');
        expect(getFocusedText()).toBe('name 1');
        press('ArrowDown', { ctrlKey: true });
        expect(getFocusedText()).toBe('name 4');
        press('ArrowUp', { metaKey: true });
        expect(getFocusedText()).toBe('name 0');
        press('End');
        expect(getFocusedText()).toBe('city 0');
        press('Home');
        expect(getFocusedText()).toBe('name 0');
        press('End', { ctrlKey: true });
        expect(getFocusedText()).toBe('city 4');
        press('Home', { ctrlKey: true });
        expect(getFocusedText()).toBe('name 0');
    });
    it('moves the Tab stop with the focus', () => {
        const { focusCell, getCell, press } = setup();
        focusCell('name 0');
        press('ArrowDown');
        expect(getCell('name 1').tabIndex).toBe(0);
        expect(getCell('name 0').tabIndex).toBe(-1);
    });
    it('does not take the focus when the table is rendered with a focused cell', () => {
        const { getCell } = setup({ focused: { cell: { columnKey: 'city', rowKeyValue: 3 } } });
        expect(document.activeElement).toBe(document.body);
        expect(getCell('city 3').tabIndex).toBe(0);
        expect(getCell('name 0').tabIndex).toBe(-1);
    });
    it('skips hidden columns and group rows', () => {
        const { focusCell, getFocusedText, press } = setup({
            columns: [{ key: 'name' }, { key: 'id', visible: false }, { key: 'city' }, { key: 'group' }],
            groups: [{ columnKey: 'group' }],
        });
        focusCell('name 1');
        press('ArrowRight');
        expect(getFocusedText()).toBe('city 1');
        press('ArrowDown');
        expect(getFocusedText()).toBe('city 2');
    });
    it('moves through the rows of a tree', () => {
        const { focusCell, getFocusedText, press } = setup({ treeGroupKeyField: 'parentId' });
        focusCell('name 0');
        press('ArrowDown');
        expect(getFocusedText()).toBe('name 1');
        press('ArrowDown', { ctrlKey: true });
        expect(getFocusedText()).toBe('name 4');
    });
    it('changes the page by PageDown and PageUp', () => {
        const { focusCell, getFocusedText, press, table } = setup({ paging: { enabled: true, pageSize: 2 } });
        focusCell('city 1');
        press('PageDown');
        expect(table().props.paging!.pageIndex).toBe(1);
        expect(getFocusedText()).toBe('city 2');
        press('PageDown');
        press('PageDown');
        expect(table().props.paging!.pageIndex).toBe(2);
        expect(getFocusedText()).toBe('city 4');
        press('PageUp');
        expect(table().props.paging!.pageIndex).toBe(1);
        expect(getFocusedText()).toBe('city 2');
    });
    it('opens the editor by Enter and F2, the focus returns to the cell when the editor is closed', () => {
        const { focusCell, getCell, getFocusedText, press, table } = setup({ editingMode: EditingMode.Cell });
        focusCell('name 1');
        // the editor closes on the keyup of Enter which comes to the window
        const windowKeyUp = jest.fn();
        window.addEventListener('keyup', windowKeyUp);
        press('Enter');
        window.removeEventListener('keyup', windowKeyUp);
        expect(windowKeyUp).not.toHaveBeenCalled();
        const input = document.activeElement as HTMLInputElement;
        expect(input.tagName).toBe('INPUT');
        expect(input.value).toBe('name 1');
        // the arrows move the caret in the editor
        fireEvent.keyDown(input, { key: 'ArrowRight' });
        expect(table().props.focused).toEqual({ cell: { columnKey: 'name', rowKeyValue: 1 } });

        fireEvent.change(input, { target: { value: 'changed' } });
        fireEvent.keyUp(input, { key: 'Escape', keyCode: 27 });
        expect(getFocusedText()).toBe('name 1');
        expect(document.activeElement).toBe(getCell('name 1'));

        press('F2');
        fireEvent.change(document.activeElement!, { target: { value: 'changed' } });
        fireEvent.keyUp(document.activeElement!, { key: 'Enter', keyCode: 13 });
        expect(getFocusedText()).toBe('changed');
        expect(table().props.data![1].name).toBe('changed');
    });
    it('does not open the editor of a column which is not editable', () => {
        const { focusCell, press, table } = setup({ columns: [{ ...columns[0], isEditable: false }, columns[1]], editingMode: EditingMode.Cell });
        focusCell('name 1');
        press('Enter');
        press('F2');
        expect(document.activeElement!.tagName).toBe('TD');
        expect(table().props.editableCells || []).toEqual([]);
    });
    it('keeps the keys of the browser which are not used', () => {
        const { focusCell } = setup();
        focusCell('name 1');
        expect(fireEvent.keyDown(document.activeElement!, { key: 'c', ctrlKey: true })).toBe(true);
        expect(fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })).toBe(false);
    });
    it('scrolls to the cell which is not rendered by the virtual scrolling', () => {
        const { focusCell, getFocusedText, press } = setup({
            data: createData(100),
            virtualScrolling: { enabled: true, itemHeight: 40, tbodyHeight: 200 },
        });
        focusCell('name 0');
        press('ArrowDown', { ctrlKey: true });
        expect(getFocusedText()).toBe('name 99');
        press('ArrowUp', { ctrlKey: true });
        expect(getFocusedText()).toBe('name 0');
    });
    it('re-renders only the rows of the cells which lose and get the focus with memoizedRows', () => {
        let renderedRows = 0;
        const { focusCell, getFocusedText, press } = setup({
            childComponents: { dataRow: { elementAttributes: () => { renderedRows++; return {}; } } },
            memoizedRows: true,
        });
        focusCell('name 1');
        renderedRows = 0;
        press('ArrowDown');
        expect(getFocusedText()).toBe('name 2');
        expect(renderedRows).toBe(2);
    });
    it('keeps a ref of the cell customization', () => {
        const elements: HTMLElement[] = [];
        const { focusCell, getFocusedText, press } = setup({
            childComponents: { cell: { elementAttributes: () => ({ ref: (element: HTMLElement | null) => element && elements.push(element) }) } },
        });
        expect(elements.length).toBeGreaterThanOrEqual(10);
        focusCell('name 0');
        press('ArrowDown');
        expect(getFocusedText()).toBe('name 1');
    });
    it('has no violations found by axe', async () => {
        const { container } = setup({ editingMode: EditingMode.Cell, sortingMode: SortingMode.Single, paging: { enabled: true, pageSize: 2 } });
        const results = await axe.run(container, {
            // there is no layout in jsdom, a single table is not a page
            rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
        });
        expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.html).join(', ')}`)).toEqual([]);
    });
});

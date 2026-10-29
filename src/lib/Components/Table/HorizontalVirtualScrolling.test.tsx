import * as React from 'react';

import { IKaTableProps, ITableInstance, Table } from '../..';
import { act, fireEvent, render } from '@testing-library/react';

import { useTable } from '../../hooks/UseTable';

// 50 columns of 100px, 400px of them are visible
const columns = Array.from({ length: 50 }, (_, index) => ({ key: `c${index}`, title: `C${index}`, width: 100 }));
const createData = (count: number) => Array.from({ length: count }, (_, id) => {
    const row: Record<string, unknown> = { id };
    columns.forEach((column) => {
        row[column.key] = `${column.key} ${id}`;
    });
    return row;
});
const virtualScrolling = { enabled: true, horizontal: true, tableWidth: 400, itemHeight: 40, tbodyHeight: 200 };
const range = (first: number, last: number) => Array.from({ length: last - first + 1 }, (_, index) => first + index);

const setup = (tableProps: Partial<IKaTableProps> = {}) => {
    let table: ITableInstance;
    const TableWithInstance = () => {
        table = useTable();
        return <Table table={table} columns={columns} data={createData(3)} rowKeyField='id' virtualScrolling={virtualScrolling} {...tableProps} />;
    };
    const result = render(<TableWithInstance />);
    const wrapper = result.container.querySelector('.ka-table-wrapper')!;
    const scrollLeftTo = (scrollLeft: number) => fireEvent.scroll(wrapper, { target: { scrollLeft } });
    // the titles of the rendered columns and the spacers
    const getHeader = () => Array.from(result.container.querySelectorAll('thead tr:first-child > *')).map((cell) => (
        cell.classList.contains('ka-virtual-column-spacer') ? 'spacer' : cell.textContent
    ));
    const getColWidths = () => Array.from(result.container.querySelectorAll('colgroup col')).map((col) => Number(col.getAttribute('width')));
    const getFirstRowCells = () => Array.from(result.container.querySelector('tbody tr.ka-row')!.querySelectorAll('td'));
    return { ...result, getColWidths, getFirstRowCells, getHeader, scrollLeftTo, table: () => table };
};

describe('virtualScrolling.horizontal (#495)', () => {
    it('renders the visible columns and a spacer in place of the other ones', () => {
        const { getColWidths, getFirstRowCells, getHeader } = setup();
        expect(getHeader()).toEqual(['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'spacer']);
        expect(getColWidths()).toEqual([100, 100, 100, 100, 100, 100, 4400]);
        expect(getFirstRowCells().map((cell) => cell.textContent)).toEqual([...range(0, 5).map((index) => `c${index} 0`), '']);
    });
    it.each([false, true])('renders the columns to which the table is scrolled, memoizedRows: %s', (memoizedRows) => {
        const { getColWidths, getFirstRowCells, getHeader, scrollLeftTo, table } = setup({ memoizedRows });
        scrollLeftTo(2050);
        expect(table().props.virtualScrolling!.scrollLeft).toBe(2050);
        expect(getHeader()).toEqual(['spacer', ...range(18, 26).map((index) => `C${index}`), 'spacer']);
        expect(getFirstRowCells().map((cell) => cell.textContent)).toEqual(['', ...range(18, 26).map((index) => `c${index} 0`), '']);
        // the table keeps its width
        expect(getColWidths().reduce((sum, width) => sum + width, 0)).toBe(5000);
        // the same columns stay visible: nothing is dispatched and rendered again
        scrollLeftTo(2080);
        expect(table().props.virtualScrolling!.scrollLeft).toBe(2050);
    });
    it('always renders the fixed columns', () => {
        const { getHeader, scrollLeftTo } = setup({ columns: columns.map((column, index) => (index === 0 ? { ...column, fixed: 'left' as const } : column)) });
        scrollLeftTo(2050);
        expect(getHeader()).toEqual(['C0', 'spacer', ...range(18, 26).map((index) => `C${index}`), 'spacer']);
    });
    it('spans the details row and the row without data over the rendered columns and the spacers', () => {
        const { container } = setup({ detailsRows: [0], childComponents: { detailsRow: { content: () => 'details' } } });
        expect(container.querySelector('.ka-details-row td')!.getAttribute('colspan')).toBe('7');
        const { container: emptyContainer } = setup({ data: [], noData: { text: 'No data' } });
        expect(emptyContainer.querySelector('.ka-no-data-row td')!.getAttribute('colspan')).toBe('7');
    });
    it('tells the number of the columns and their indexes', () => {
        const { container, getFirstRowCells, scrollLeftTo } = setup();
        scrollLeftTo(2050);
        expect(container.querySelector('table')!.getAttribute('aria-colcount')).toBe('50');
        expect(container.querySelector('thead th')!.getAttribute('aria-colindex')).toBe('19');
        expect(getFirstRowCells().map((cell) => cell.getAttribute('aria-colindex'))).toEqual([null, ...range(19, 27).map(String), null]);
        expect(container.querySelector('.ka-virtual-column-spacer')!.getAttribute('aria-hidden')).toBe('true');
    });
    it('scrolls to the column of the cell which gets the focus by the keyboard', () => {
        const { getFirstRowCells, table } = setup();
        act(() => getFirstRowCells().find((cell) => cell.textContent === 'c5 0')!.focus());
        // c6 is not rendered
        fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
        expect(table().props.virtualScrolling!.scrollLeft).toBe(300);
        expect(document.activeElement!.textContent).toBe('c6 0');
    });
    it('renders all the columns with the grouped columns of the header', () => {
        const { container, getFirstRowCells } = setup({ groupedColumns: [{ key: 'g', title: 'G', columnsKeys: ['c0', 'c1'] }] });
        expect(container.querySelectorAll('.ka-virtual-column-spacer').length).toBe(0);
        expect(getFirstRowCells().length).toBe(50);
    });
    it('measures the width of the table when it is not set', () => {
        const { table } = setup({ virtualScrolling: { enabled: true, horizontal: true, itemHeight: 40, tbodyHeight: 200 } });
        // jsdom has no layout: the width until it is measured
        expect(table().props.virtualScrolling!.tableWidth).toBe(1600);
    });
});

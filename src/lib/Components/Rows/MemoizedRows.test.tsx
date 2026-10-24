import * as React from 'react';

import { IKaTableProps, ITableInstance, Table } from '../..';
import { act, fireEvent, render } from '@testing-library/react';

import { EditingMode } from '../../enums';
import { useTable } from '../../hooks/UseTable';

const createData = (count: number) => Array.from({ length: count }, (_, index) => ({ id: index, name: `name ${index}` }));
const columns = [{ key: 'name' }, { key: 'id' }];

const setup = (tableProps: Partial<IKaTableProps>) => {
    const renders = { rows: 0, cells: 0 };
    let table: ITableInstance;
    // the customizations render from their props only, as memoizedRows requires
    const childComponents = {
        dataRow: { elementAttributes: () => { renders.rows++; return {}; } },
        cell: { elementAttributes: () => { renders.cells++; return {}; } },
    };
    const props: IKaTableProps = { columns, data: createData(20), editingMode: EditingMode.Cell, rowKeyField: 'id', ...tableProps };
    const TableWithCounters = () => {
        table = useTable();
        return <Table table={table} childComponents={childComponents} {...props} />;
    };
    const result = render(<TableWithCounters />);
    const measure = (callback: () => void) => {
        renders.rows = 0;
        renders.cells = 0;
        act(callback);
        return { ...renders };
    };
    return { ...result, measure, table: () => table };
};

describe('memoizedRows', () => {
    it('is disabled by default: every change re-renders all rows', () => {
        const { measure, table } = setup({});
        expect(measure(() => table().showDetailsRow(1))).toEqual({ rows: 20, cells: 40 });
    });
    it('re-renders only the changed row', () => {
        const { measure, table } = setup({ memoizedRows: true });
        expect(measure(() => table().showDetailsRow(1))).toEqual({ rows: 1, cells: 2 });
    });
    it('re-renders only the edited cell', () => {
        const { measure, table } = setup({ memoizedRows: true });
        measure(() => table().openEditor(1, 'name'));
        expect(measure(() => table().updateEditorValue(1, 'name', 'new value')).cells).toBe(1);
    });
    it('keeps the rows memoized without customizations', () => {
        let formattedCells = 0;
        const format = ({ value }: { value: unknown }) => {
            formattedCells++;
            return `${value}`;
        };
        const { measure, table } = setup({ childComponents: undefined, format, memoizedRows: true });
        measure(() => {
            formattedCells = 0;
            table().showDetailsRow(1);
        });
        expect(formattedCells).toBe(2);
    });
    it('shows changed data and selection', () => {
        const { container, table } = setup({ memoizedRows: true });
        act(() => table().updateCellValue(1, 'name', 'changed'));
        act(() => table().selectRow(2));
        const rows = container.querySelectorAll('tbody tr');
        expect(rows[1].textContent).toContain('changed');
        expect(rows[2].classList.contains('ka-row-selected')).toBe(true);
    });
    it('renders only the new rows on virtual scrolling', () => {
        const virtualScrolling = { enabled: true, itemHeight: 40, tbodyHeight: 200 };
        const scroll = ({ container, measure }: ReturnType<typeof setup>) => measure(() => {
            fireEvent.scroll(container.querySelector('.ka-table-wrapper')!, { target: { scrollTop: 40 } });
        }).rows;
        const rowsRenderedWithoutMemo = scroll(setup({ data: createData(1000), virtualScrolling }));
        const rowsRenderedWithMemo = scroll(setup({ data: createData(1000), memoizedRows: true, virtualScrolling }));
        expect(rowsRenderedWithoutMemo).toBeGreaterThan(5);
        // the new row and the row which gets the ref of the first row
        expect(rowsRenderedWithMemo).toBeLessThanOrEqual(2);
    });
});

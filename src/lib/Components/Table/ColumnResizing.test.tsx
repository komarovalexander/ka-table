import * as React from 'react';

import { IKaTableProps, ITableInstance, ITableProps, Table } from '../..';
import { act, fireEvent, render } from '@testing-library/react';
import { SortDirection, SortingMode } from '../../enums';

import { DispatchFunc } from '../../types';
import { kaReducer } from '../../Reducers/kaReducer';
import { useTable } from '../../hooks/UseTable';

const columns = [
    { key: 'name', title: 'Name', width: 100, sortDirection: SortDirection.Ascend },
    { key: 'city', title: 'City', width: 100 },
];
const data = Array.from({ length: 20 }, (_, id) => ({ id, name: `name ${(id * 7) % 20}`, city: `city ${id}` }));
type Row = typeof data[number];

// counts the comparisons of the sorting and the renders of the cells, keeps the width which the cells of the first column get
const setup = (tableProps: Partial<IKaTableProps> = {}) => {
    const counts = { comparisons: 0, renders: 0, width: undefined as unknown };
    const sort = () => (value1: unknown, value2: unknown) => {
        counts.comparisons++;
        return String(value1) > String(value2) ? 1 : String(value1) < String(value2) ? -1 : 0;
    };
    const childComponents = {
        cellText: {
            content: ({ column, value }: { column: { key: string; width?: unknown }; value: unknown }) => {
                counts.renders++;
                if (column.key === 'name') {
                    counts.width = column.width;
                }
                return <>{String(value)}</>;
            },
        },
    };
    let table: ITableInstance;
    const TableWithInstance = () => {
        table = useTable();
        return (
            <Table
                table={table}
                columns={columns}
                data={data}
                rowKeyField='id'
                columnResizing
                sortingMode={SortingMode.Single}
                sort={sort}
                childComponents={childComponents}
                {...tableProps}
            />
        );
    };
    const result = render(<TableWithInstance />);
    const handle = result.container.querySelector('.ka-thead-cell-resize')!;
    const getColWidth = () => result.container.querySelector('colgroup col')?.getAttribute('width');
    const reset = () => {
        counts.comparisons = 0;
        counts.renders = 0;
    };
    return { ...result, counts, getColWidth, handle, reset, table: () => table };
};

describe('ColumnResizing', () => {
    it.each([false, true])('doesn\'t sort and render the rows while the mouse moves, renders them when the resize ends (memoizedRows %s)', (memoizedRows) => {
        const { counts, getColWidth, handle, reset } = setup({ memoizedRows });
        fireEvent.mouseDown(handle, { screenX: 100 });
        reset();
        for (let screenX = 101; screenX <= 120; screenX++) {
            fireEvent.mouseMove(window, { screenX });
        }
        expect(getColWidth()).toBe('120');
        expect(counts.comparisons).toBe(0);
        expect(counts.renders).toBe(0);

        fireEvent.mouseUp(window, { screenX: 125 });
        expect(getColWidth()).toBe('125');
        expect(counts.comparisons).toBe(0);
        // the cells of the resized column get the new width: all the cells, or the ones of the column with memoizedRows
        expect(counts.renders).toBe(memoizedRows ? data.length : data.length * columns.length);
        expect(counts.width).toBe(125);
    });

    it('renders the rows when a column gets a new width without the mouse', () => {
        const { counts, getColWidth, reset, table } = setup();
        reset();
        act(() => table().resizeColumn('name', 200));
        expect(getColWidth()).toBe('200');
        expect(counts.comparisons).toBe(0);
        expect(counts.renders).toBe(data.length * columns.length);
        expect(counts.width).toBe(200);
    });

    it('doesn\'t sort and render the rows when the header filter popup is opened', () => {
        const { counts, reset, table } = setup();
        reset();
        act(() => table().updateHeaderFilterPopupState('city', true));
        act(() => table().updatePopupPosition({ x: 10, y: 20 }));
        act(() => table().updateHeaderFilterSearchValue('city', 'cit'));
        expect(counts.comparisons).toBe(0);
        expect(counts.renders).toBe(0);
    });

    it('sorts and renders the rows when the columns change them', () => {
        const { counts, reset, table } = setup();
        reset();
        act(() => table().updateSortDirection('name'));
        expect(counts.comparisons).toBeGreaterThan(0);
        expect(counts.renders).toBe(data.length * columns.length);
    });

    it('resizes a column of a controlled table', () => {
        let comparisons = 0;
        const sort = () => (value1: unknown, value2: unknown) => {
            comparisons++;
            return String(value1) > String(value2) ? 1 : -1;
        };
        const ControlledTable = () => {
            const [tableProps, setTableProps] = React.useState<ITableProps<Row>>({ columns, data, rowKeyField: 'id', sortingMode: SortingMode.Single });
            const dispatch: DispatchFunc = (action) => setTableProps((prevState) => kaReducer(prevState, action));
            return <Table {...tableProps} columnResizing sort={sort} dispatch={dispatch} />;
        };
        const { container } = render(<ControlledTable />);
        fireEvent.mouseDown(container.querySelector('.ka-thead-cell-resize')!, { screenX: 100 });
        comparisons = 0;
        fireEvent.mouseMove(window, { screenX: 150 });
        fireEvent.mouseUp(window, { screenX: 160 });
        expect(container.querySelector('colgroup col')?.getAttribute('width')).toBe('160');
        expect(comparisons).toBe(0);
    });
});

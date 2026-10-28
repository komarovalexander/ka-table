import * as PropsUtils from '../Utils/PropsUtils';
import * as React from 'react';

import { ITableInstance, ITableProps, Table } from '..';
import { PagingPosition, SortDirection, SortingMode } from '../enums';
import { act, render } from '@testing-library/react';

import { useTable } from './UseTable';

const data = [
    { id: 1, name: 'b', group: 'x', parent: null },
    { id: 2, name: 'a', group: 'y', parent: 1 },
    { id: 3, name: 'c', group: 'x', parent: 1 },
];
const columns = [{ key: 'name' }, { key: 'group' }];
const sortedColumns = [{ key: 'name', sortDirection: SortDirection.Ascend }, { key: 'group' }];
type Row = typeof data[number];
const baseProps: ITableProps<Row> = { columns, data, rowKeyField: 'id' };
const dispatch = () => {};

// the attributes are sorted: an attribute added on a re-render goes after the others
const normalizeHtml = (html: string) => {
    const element = document.createElement('div');
    element.innerHTML = html;
    element.querySelectorAll('*').forEach((child) => {
        const attributes = Array.from(child.attributes).sort((a, b) => a.name.localeCompare(b.name));
        attributes.forEach((attribute) => child.removeAttribute(attribute.name));
        attributes.forEach((attribute) => child.setAttribute(attribute.name, attribute.value));
    });
    return element.innerHTML;
};

const getHtml = (props: ITableProps<Row>) => {
    const { container, unmount } = render(<Table {...props} dispatch={dispatch} />);
    const html = normalizeHtml(container.innerHTML);
    unmount();
    return html;
};

describe('useTableData', () => {
    const groups = [{ columnKey: 'group' }];
    // the same columns are passed before and after the change, so only the checked prop is changed
    const filterColumns = [{ key: 'name', filterRowValue: 'b' }, { key: 'group' }];
    const formatColumns = [{ key: 'name', headerFilterValues: ['B'] }, { key: 'group' }];
    // [changed prop, props before, props after]
    const cases: [string, Partial<ITableProps<Row>>, Partial<ITableProps<Row>>][] = [
        ['columns', { sortingMode: SortingMode.Single }, { sortingMode: SortingMode.Single, columns: sortedColumns }],
        ['data', {}, { data: [data[0]] }],
        ['extendedFilter', { extendedFilter: (d) => d }, { extendedFilter: (d) => d.slice(1) }],
        ['extendedSort', { extendedSort: (d) => d }, { extendedSort: (d) => [...d].reverse() }],
        ['filter', {
            columns: filterColumns, filter: () => (value, filterRowValue) => value === filterRowValue,
        }, {
            columns: filterColumns, filter: () => (value, filterRowValue) => value !== filterRowValue,
        }],
        ['format', {
            columns: formatColumns, format: ({ value }) => (value == null ? undefined : String(value).toUpperCase()),
        }, {
            columns: formatColumns, format: ({ value }) => String(value),
        }],
        ['groups', {}, { groups }],
        ['groupsExpanded', { groups, groupsExpanded: [['x'], ['y']] }, { groups, groupsExpanded: [['x']] }],
        ['rowKeyField', { treeGroupKeyField: 'parent' }, { treeGroupKeyField: 'parent', rowKeyField: 'name' }],
        ['search', { searchText: 'a', search: () => undefined }, { searchText: 'a', search: ({ rowData }) => rowData.id === 3 }],
        ['searchText', {}, { searchText: 'a' }],
        ['sort', {
            columns: sortedColumns, sortingMode: SortingMode.Single,
        }, {
            columns: sortedColumns, sortingMode: SortingMode.Single, sort: () => (value1: string, value2: string) => value1 < value2 ? 1 : -1,
        }],
        ['sortingMode', { columns: sortedColumns, sortingMode: SortingMode.Single }, { columns: sortedColumns, sortingMode: SortingMode.SingleRemote }],
        ['treeGroupKeyField', {}, { treeGroupKeyField: 'parent' }],
        ['treeGroupsExpanded', { treeGroupKeyField: 'parent', treeGroupsExpanded: [1] }, { treeGroupKeyField: 'parent', treeGroupsExpanded: [] }],
        ['paging', { paging: { enabled: true, pageSize: 1 } }, { paging: { enabled: true, pageIndex: 1, pageSize: 1 } }],
    ];

    it.each(cases)('processes the data again when %s changes', (_, propsBefore, propsAfter) => {
        const props = { ...baseProps, ...propsBefore };
        const newProps = { ...baseProps, ...propsAfter };
        const expectedHtml = getHtml(newProps);
        // the change of the prop changes the result
        expect(getHtml(props)).not.toBe(expectedHtml);

        const { container, rerender } = render(<Table {...props} dispatch={dispatch} />);
        rerender(<Table {...newProps} dispatch={dispatch} />);
        expect(normalizeHtml(container.innerHTML)).toBe(expectedHtml);
    });

    it('processes the data once for the table and the paging, and only when it is needed', () => {
        const getData = vi.spyOn(PropsUtils, 'getData');
        let table: ITableInstance<Row>;
        const TableWithPaging = () => {
            table = useTable<Row>();
            return (
                <Table
                    {...baseProps}
                    table={table}
                    paging={{ enabled: true, pageSize: 1, position: PagingPosition.TopAndBottom }}
                    sortingMode={SortingMode.Single}
                />
            );
        };
        render(<TableWithPaging />);
        expect(getData).toHaveBeenCalledTimes(1);

        act(() => table.selectRow(1));
        act(() => table.openEditor(1, 'name'));
        act(() => table.updateEditorValue(1, 'name', 'new value'));
        act(() => table.updatePageIndex(1));
        expect(getData).toHaveBeenCalledTimes(1);

        act(() => table.updateSortDirection('name'));
        expect(getData).toHaveBeenCalledTimes(2);
        getData.mockRestore();
    });

    it('doesn\'t process the data again when the widths of the columns or their header filter popups change', () => {
        const getData = vi.spyOn(PropsUtils, 'getData');
        // the header filter popup shows its values with a table of its own
        const getCallsOfTable = () => getData.mock.calls.filter(([props]) => props.data === data).length;
        let table: ITableInstance<Row>;
        const TableWithInstance = () => {
            table = useTable<Row>();
            return <Table {...baseProps} table={table} />;
        };
        render(<TableWithInstance />);
        expect(getCallsOfTable()).toBe(1);

        act(() => table.resizeColumn('name', 200));
        act(() => table.updateHeaderFilterPopupState('name', true));
        act(() => table.updatePopupPosition({ x: 10, y: 20 }));
        act(() => table.updateHeaderFilterSearchValue('name', 'a'));
        expect(getCallsOfTable()).toBe(1);

        act(() => table.updateHeaderFilterValues('name', 'a', true));
        expect(getCallsOfTable()).toBe(2);
        getData.mockRestore();
    });
});

import { ActionType, SortDirection, SortingMode } from '../../enums';
import { ITableInstance, ITableProps, Table } from '../Table/Table';
import { act, render } from '@testing-library/react';

import React from 'react';
import { TableUncontrolled } from './TableUncontrolled';
import { createRoot } from 'react-dom/client';
import { useTable } from '../../hooks/UseTable';
import { useTableInstance } from '../../hooks/UseTableInstance';

jest.useFakeTimers();

const props: any = {
    columns: [
        { key: 'column', name: 'Column 1' },
        { key: 'column2', name: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: jest.fn(),
    rowKeyField: 'id',
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    act(() => {
        root.render(<TableUncontrolled {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

const tableDispatchMock = jest.fn();
const TableControlledWrapper = (wrapperProps: any) => {
    const table = useTable(({ onDispatch: tableDispatchMock }));
    return <TableUncontrolled table={table} {...wrapperProps} />
}

it('renders with table', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);

    act(() => {
        root.render(<TableControlledWrapper {...props} childComponents={{}}/>);
    });
    jest.runAllTimers();
    expect(tableDispatchMock.mock.calls).toHaveLength(1);
    expect(tableDispatchMock.mock.calls[0][1]).not.toHaveProperty('childComponents');

    act(() => {
        root.unmount();
    });
});

describe('controlled props', () => {
    const data = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
    let table: ITableInstance;
    // columns are created on every render, as in the examples of the docs
    const TableWithProps = (tableProps: Partial<ITableProps>) => {
        table = useTable();
        return <Table table={table} rowKeyField='id' columns={[{ key: 'name' }]} data={data} {...tableProps} />;
    };

    it('keeps the state of columns when the parent passes equal columns again', () => {
        const { rerender } = render(<TableWithProps sortingMode={SortingMode.Single} />);
        act(() => table.updateSortDirection('name'));
        act(() => table.resizeColumn('name', 120));
        rerender(<TableWithProps sortingMode={SortingMode.Single} />);
        expect(table.props.columns).toEqual([{ key: 'name', sortDirection: SortDirection.Ascend, width: 120 }]);
    });
    it('applies the changed fields of columns and keeps their state', () => {
        const { rerender } = render(<TableWithProps columns={[{ key: 'name' }, { key: 'id' }]} sortingMode={SortingMode.Single} />);
        act(() => table.updateSortDirection('name'));
        rerender(<TableWithProps columns={[{ key: 'name', title: 'Name' }, { key: 'id' }]} sortingMode={SortingMode.Single} />);
        expect(table.props.columns).toEqual([{ key: 'name', sortDirection: SortDirection.Ascend, title: 'Name' }, { key: 'id' }]);
    });
    it('keeps edited data when the parent passes the same data again', () => {
        const { rerender } = render(<TableWithProps />);
        act(() => table.updateCellValue(1, 'name', 'edited'));
        rerender(<TableWithProps data={[...data]} />);
        expect(table.props.data).toEqual([{ id: 1, name: 'edited' }, { id: 2, name: 'b' }]);
    });
    it('applies new data and renders it right away', () => {
        const { container, rerender } = render(<TableWithProps />);
        act(() => table.updateCellValue(1, 'name', 'edited'));
        rerender(<TableWithProps data={[{ id: 3, name: 'c' }]} />);
        expect(table.props.data).toEqual([{ id: 3, name: 'c' }]);
        expect(container.querySelector('tbody')!.textContent).toBe('c');
    });
    it('keeps the page index when the parent passes equal paging again', () => {
        const { rerender } = render(<TableWithProps paging={{ enabled: true, pageSize: 1 }} />);
        act(() => table.updatePageIndex(1));
        rerender(<TableWithProps paging={{ enabled: true, pageSize: 1 }} />);
        expect(table.props.paging).toEqual({ enabled: true, pageIndex: 1, pageSize: 1 });
    });
});

it('calls onDispatch once per action in StrictMode', () => {
    const onDispatch = jest.fn();
    let table: ITableInstance;
    const TableWithOnDispatch = () => {
        table = useTable({ onDispatch });
        return <Table table={table} rowKeyField='id' columns={[{ key: 'id' }]} data={[{ id: 1 }]} />;
    };
    render(<React.StrictMode><TableWithOnDispatch /></React.StrictMode>);
    act(() => table.selectRow(1));
    jest.runAllTimers();
    expect(onDispatch.mock.calls.filter(([action]) => action.type === ActionType.SelectRow)).toHaveLength(1);
});

it('provides the same table instance if the table prop is not set', () => {
    const instances: ITableInstance[] = [];
    const InstanceReader = () => {
        instances.push(useTableInstance());
        return null;
    };
    render(
        <Table
            rowKeyField='id'
            columns={[{ key: 'id' }]}
            data={[{ id: 1 }]}
            childComponents={{ headCell: { content: () => <InstanceReader /> } }}
        />
    );
    act(() => instances[0].selectRow(1));
    expect(instances.length).toBeGreaterThan(1);
    expect(instances.every((instance) => instance === instances[0])).toBe(true);
    expect(instances[instances.length - 1].props.selectedRows).toEqual([1]);
});

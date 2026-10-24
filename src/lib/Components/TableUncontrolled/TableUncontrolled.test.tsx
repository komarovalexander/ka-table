import { ActionType, EditingMode, SortDirection, SortingMode } from '../../enums';
import { ITableInstance, ITableProps, Table } from '../Table/Table';
import { act, fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { ITableUncontrolledPropsKeys, TableUncontrolled } from './TableUncontrolled';
import { createRoot } from 'react-dom/client';
import { kaPropsUtils } from '../../utils';
import { useTable } from '../../hooks/UseTable';
import { useTableInstance } from '../../hooks/UseTableInstance';

vi.useFakeTimers();

const props: ITableUncontrolledPropsKeys = {
    columns: [
        { key: 'column' },
        { key: 'column2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
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

const tableDispatchMock = vi.fn();
const TableControlledWrapper = (wrapperProps: ITableUncontrolledPropsKeys) => {
    const table = useTable(({ onDispatch: tableDispatchMock }));
    return <TableUncontrolled table={table} {...wrapperProps} />
}

it('renders with table', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);

    act(() => {
        root.render(<TableControlledWrapper {...props} childComponents={{}}/>);
    });
    vi.runAllTimers();
    expect(tableDispatchMock.mock.calls).toHaveLength(1);
    expect(tableDispatchMock.mock.calls[0][1]).not.toHaveProperty('childComponents');

    act(() => {
        root.unmount();
    });
});

describe('controlled props', () => {
    const data = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
    type Row = typeof data[number];
    let table: ITableInstance<Row>;
    // columns are created on every render, as in the examples of the docs
    const TableWithProps = (tableProps: Partial<ITableProps<Row>>) => {
        table = useTable<Row>();
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
    it('uses the latest functions: the actions and table.props get the current extendedFilter', () => {
        const { container, rerender } = render(<TableWithProps extendedFilter={(rows) => rows} />);
        rerender(<TableWithProps extendedFilter={(rows) => rows.filter((row) => row.id === 2)} />);
        expect(container.querySelector('tbody')!.textContent).toBe('b');
        expect(kaPropsUtils.getFilteredData(table.props)).toEqual([{ id: 2, name: 'b' }]);
        act(() => table.selectAllFilteredRows());
        expect(table.props.selectedRows).toEqual([2]);
    });
    it('uses the latest search and validation', () => {
        const { container, rerender } = render(<TableWithProps searchText='b' search={({ searchText, rowData }) => rowData.name === searchText} />);
        expect(container.querySelector('tbody')!.textContent).toBe('b');
        rerender(<TableWithProps searchText='b' search={() => true} />);
        expect(container.querySelector('tbody')!.textContent).toBe('ab');
        // the default search when the parent doesn't pass a search anymore
        rerender(<TableWithProps searchText='b' />);
        expect(container.querySelector('tbody')!.textContent).toBe('b');
        expect(table.props.search).toBeUndefined();

        rerender(<TableWithProps validation={() => undefined} />);
        rerender(<TableWithProps validation={({ value }) => (value ? undefined : 'required')} />);
        act(() => table.openRowEditors(1));
        act(() => table.updateEditorValue(1, 'name', ''));
        act(() => table.saveRowEditors(1, { validate: true }));
        expect(table.props.editableCells).toEqual([{ columnKey: 'name', rowKeyValue: 1, editorValue: '', validationMessage: 'required' }]);
    });
    it('applies the other props which the parent changes', () => {
        const { container, rerender } = render(<TableWithProps editingMode={EditingMode.None} height={100} />);
        rerender(<TableWithProps editingMode={EditingMode.Cell} height={200} />);
        expect((container.querySelector('.ka') as HTMLElement).style.height).toBe('200px');
        fireEvent.click(screen.getByText('a'));
        expect(container.querySelector('.ka-cell-editor input')).not.toBeNull();
    });
    it('applies data, columns, paging and selectedRows when the loading ends', () => {
        const { container, rerender } = render(<TableWithProps loading={{ enabled: true }} />);
        rerender(<TableWithProps loading={{ enabled: true }} data={[{ id: 3, name: 'c' }]} />);
        expect(table.props.data).toEqual(data);
        rerender(<TableWithProps loading={{ enabled: false }} data={[{ id: 3, name: 'c' }]} />);
        expect(container.querySelector('tbody')!.textContent).toBe('c');
    });
    it('applies only controlledPropsKeys if they are set', () => {
        const { rerender } = render(<TableWithProps controlledPropsKeys={['data']} editingMode={EditingMode.None} />);
        rerender(<TableWithProps controlledPropsKeys={['data']} editingMode={EditingMode.Cell} data={[{ id: 3, name: 'c' }]} />);
        expect(table.props.editingMode).toBe(EditingMode.None);
        expect(table.props.data).toEqual([{ id: 3, name: 'c' }]);
    });
});

it('applies the props changed while the table with the same instance was not mounted', () => {
    let table: ITableInstance;
    const TableWithInstance = ({ shown, rows }: { shown: boolean, rows: { id: number, name: string }[] }) => {
        table = useTable();
        return shown ? <Table table={table} rowKeyField='id' columns={[{ key: 'name' }]} data={rows} sortingMode={SortingMode.Single} /> : null;
    };
    const oldRows = [{ id: 1, name: 'b' }, { id: 2, name: 'a' }];
    const newRows = [{ id: 3, name: 'd' }, { id: 4, name: 'c' }];
    const { container, rerender } = render(<TableWithInstance shown rows={oldRows} />);
    act(() => table!.updateSortDirection('name'));
    rerender(<TableWithInstance shown={false} rows={oldRows} />);
    rerender(<TableWithInstance shown={false} rows={newRows} />);
    rerender(<TableWithInstance shown rows={newRows} />);
    // the new data with the sorting of the table
    expect(container.querySelector('tbody')!.textContent).toBe('cd');
});

it('calls onDispatch once per action in StrictMode', () => {
    const onDispatch = vi.fn();
    let table: ITableInstance;
    const TableWithOnDispatch = () => {
        table = useTable({ onDispatch });
        return <Table table={table} rowKeyField='id' columns={[{ key: 'id' }]} data={[{ id: 1 }]} />;
    };
    render(<React.StrictMode><TableWithOnDispatch /></React.StrictMode>);
    act(() => table.selectRow(1));
    vi.runAllTimers();
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

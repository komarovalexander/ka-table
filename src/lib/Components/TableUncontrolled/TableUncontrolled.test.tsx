import { ActionType, EditingMode, SortDirection, SortingMode } from '../../enums';
import { ITableInstance, ITableProps, Table } from '../Table/Table';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { startTransition, StrictMode, Suspense, useLayoutEffect, useState } from 'react';
import { ITableUncontrolledPropsKeys, TableUncontrolled } from './TableUncontrolled';
import { ChildComponents } from '../../Models/ChildComponents';
import { ICellTextProps } from '../../props';
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
    it('applies new data and keeps the page index inside the pages', () => {
        const { container, rerender } = render(<TableWithProps paging={{ enabled: true, pageSize: 1 }} />);
        act(() => table.updatePageIndex(1));
        // the page index is updated by an action of a layout effect, which gets the state with the new data
        rerender(<TableWithProps paging={{ enabled: true, pageSize: 1 }} data={[{ id: 3, name: 'c' }]} />);
        expect(container.querySelector('tbody')!.textContent).toBe('c');
        expect(table.props.data).toEqual([{ id: 3, name: 'c' }]);
        expect(table.props.paging).toEqual({ enabled: true, pageIndex: 0, pageSize: 1 });
    });
    it('applies new data to an action which a customization dispatches when React commits this data', () => {
        // the cell deselects its row when the row is removed: React calls the cleanup of a layout effect
        // after the render which has applied the new data and before the effects of the table
        const Cell = ({ rowKeyValue, value }: ICellTextProps<Row>) => {
            const instance = useTableInstance<Row>();
            useLayoutEffect(() => () => instance.deselectRow(rowKeyValue), [instance, rowKeyValue]);
            return <>{String(value)}</>;
        };
        const childComponents: ChildComponents<Row> = { cellText: { content: (cellProps) => <Cell {...cellProps} /> } };
        const TableWithCells = ({ rows }: { rows: Row[] }) => {
            table = useTable<Row>();
            return <Table table={table} rowKeyField='id' columns={[{ key: 'name' }]} data={rows} selectedRows={[1, 2]} childComponents={childComponents} />;
        };
        const { container, rerender } = render(<TableWithCells rows={data} />);
        rerender(<TableWithCells rows={[{ id: 2, name: 'changed' }]} />);
        expect(container.querySelector('tbody')!.textContent).toBe('changed');
        expect(table.props.data).toEqual([{ id: 2, name: 'changed' }]);
        expect(table.props.selectedRows).toEqual([2]);
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

describe('a transition which changes the props of the table and is suspended', () => {
    const rows = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
    let table: ITableInstance;
    let setParentState: (state: { searchText: string, isSuspended: boolean }) => void;
    let endLoading: () => void;
    const renderTable = () => {
        let isLoaded = false;
        const loading = new Promise<void>((resolve) => {
            endLoading = () => {
                isLoaded = true;
                resolve();
            };
        });
        // suspends the render of the parent, as a component which loads its data
        const Suspender = ({ isSuspended }: { isSuspended: boolean }) => {
            if (isSuspended && !isLoaded) {
                throw loading;
            }
            return null;
        };
        const Parent = () => {
            table = useTable();
            const [state, setState] = useState({ searchText: '', isSuspended: false });
            setParentState = setState;
            return (
                <Suspense fallback='loading'>
                    <Table table={table} rowKeyField='id' columns={[{ key: 'name' }]} data={rows} searchText={state.searchText} />
                    <Suspender isSuspended={state.isSuspended} />
                </Suspense>
            );
        };
        return render(<Parent />);
    };
    // React renders the table with the new searchText and discards this render: the transition waits for the loading
    const startSuspendedTransition = () => act(() => startTransition(() => setParentState({ searchText: 'b', isSuspended: true })));
    const getRowsText = (container: HTMLElement) => container.querySelector('tbody')!.textContent;

    it('applies the props when the transition ends', async () => {
        const { container } = renderTable();
        startSuspendedTransition();
        expect(getRowsText(container)).toBe('ab');
        await act(async () => endLoading());
        expect(getRowsText(container)).toBe('b');
        expect(table.props.searchText).toBe('b');
    });
    it('does not apply the props by an action of the table until the transition ends', async () => {
        const { container } = renderTable();
        startSuspendedTransition();
        act(() => table.selectRow(1));
        expect(getRowsText(container)).toBe('ab');
        expect(container.querySelectorAll('.ka-row-selected')).toHaveLength(1);
        await act(async () => endLoading());
        expect(getRowsText(container)).toBe('b');
        expect(table.props.selectedRows).toEqual([1]);
    });
    it('does not apply the props when the parent cancels the transition', () => {
        const { container } = renderTable();
        startSuspendedTransition();
        act(() => setParentState({ searchText: '', isSuspended: false }));
        act(() => table.selectRow(1));
        expect(getRowsText(container)).toBe('ab');
        expect(table.props.searchText).toBe('');
        expect(table.props.selectedRows).toEqual([1]);
    });
});

describe('a table mounted with the instance of its parent after a render which React has discarded', () => {
    const rows = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
    interface ParentState { data: typeof rows, searchText: string, isShown: boolean, isSuspended: boolean }
    let table: ITableInstance;
    let setParentState: (state: ParentState) => void;
    let endLoading: () => void;
    const renderParent = (initialState: ParentState) => {
        let isLoaded = false;
        const loading = new Promise<void>((resolve) => {
            endLoading = () => {
                isLoaded = true;
                resolve();
            };
        });
        const Suspender = ({ isSuspended }: { isSuspended: boolean }) => {
            if (isSuspended && !isLoaded) {
                throw loading;
            }
            return null;
        };
        // the parent stays mounted with its instance when React discards a render of the table
        const Parent = () => {
            table = useTable();
            const [state, setState] = useState(initialState);
            setParentState = setState;
            return (
                <Suspense fallback='loading'>
                    {state.isShown && <Table table={table} rowKeyField='id' columns={[{ key: 'name' }]} data={state.data} searchText={state.searchText} />}
                    <Suspender isSuspended={state.isSuspended} />
                </Suspense>
            );
        };
        return render(<Parent />);
    };
    const getRowsText = (container: HTMLElement) => container.querySelector('tbody')!.textContent;

    it('applies the data which the parent gets while a sibling of the table is loaded', async () => {
        // React renders the table without rows and discards this render: the sibling suspends, the fallback is shown
        const { container } = renderParent({ data: [], searchText: '', isShown: true, isSuspended: true });
        act(() => setParentState({ data: rows, searchText: '', isShown: true, isSuspended: true }));
        await act(async () => endLoading());
        expect(getRowsText(container)).toBe('ab');
        expect(table.props.data).toEqual(rows);
    });
    it('applies the props of the parent when the table is hidden and shown after a suspended transition', () => {
        const { container } = renderParent({ data: rows, searchText: '', isShown: true, isSuspended: false });
        act(() => startTransition(() => setParentState({ data: rows, searchText: 'b', isShown: true, isSuspended: true })));
        // the parent cancels the transition and hides the table, then shows it again
        act(() => setParentState({ data: rows, searchText: '', isShown: false, isSuspended: false }));
        act(() => setParentState({ data: rows, searchText: '', isShown: true, isSuspended: false }));
        expect(getRowsText(container)).toBe('ab');
        expect(table.props.searchText).toBe('');
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
    render(<StrictMode><TableWithOnDispatch /></StrictMode>);
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

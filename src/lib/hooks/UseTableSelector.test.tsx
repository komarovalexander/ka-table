import * as React from 'react';

import { ITableInstance, ITableProps, Table } from '..';
import { act, render } from '@testing-library/react';

import { useTable } from './UseTable';
import { useTableSelector } from './UseTableSelector';

const data = [{ id: 1 }, { id: 2 }];

describe('useTableSelector', () => {
    let table: ITableInstance;
    let renders: unknown[];
    const TableWithSelector = <T,>({
        selector,
        isEqual,
    }: {
        selector: (props: ITableProps) => T,
        isEqual?: (value: T | undefined, newValue: T | undefined) => boolean,
    }) => {
        table = useTable();
        const selected = useTableSelector(table, selector, isEqual);
        renders.push(selected);
        return <Table table={table} rowKeyField='id' columns={[{ key: 'id' }]} data={data} />;
    };

    beforeEach(() => {
        renders = [];
    });

    it('returns undefined until the table is rendered, then the selected value', () => {
        render(<TableWithSelector selector={(props) => props.data!.length} />);
        expect(renders).toEqual([undefined, 2]);
    });
    it('re-renders the component when the selected value changes', () => {
        render(<TableWithSelector selector={(props) => props.selectedRows?.[0]} />);
        act(() => table.selectSingleRow(2));
        expect(renders[renders.length - 1]).toBe(2);
        act(() => table.deselectAllRows());
        expect(renders[renders.length - 1]).toBeUndefined();
    });
    it('does not re-render the component when other state of the table changes', () => {
        render(<TableWithSelector selector={(props) => props.selectedRows?.[0]} />);
        const rendersCount = renders.length;
        act(() => table.search('1'));
        act(() => table.updateSortDirection('id'));
        expect(renders.length).toBe(rendersCount);
    });
    it('uses isEqual to compare values', () => {
        const isShallowEqual = (value?: unknown[], newValue?: unknown[]) => !!value && !!newValue && value.length === newValue.length
            && value.every((item, index) => item === newValue[index]);
        render(<TableWithSelector selector={(props) => props.selectedRows || []} isEqual={isShallowEqual} />);
        const rendersCount = renders.length;
        act(() => table.search('1'));
        expect(renders.length).toBe(rendersCount);
        act(() => table.selectRow(1));
        expect(renders[renders.length - 1]).toEqual([1]);
    });
    it('works in a component which is rendered before the table', () => {
        const SelectedRow = ({ tableInstance }: { tableInstance: ITableInstance }) => {
            const selectedRow = useTableSelector(tableInstance, (props) => props.selectedRows?.[0] as number | undefined);
            return <span className='selected-row'>{selectedRow}</span>;
        };
        const TableWithInfo = () => {
            table = useTable();
            return (
                <>
                    <SelectedRow tableInstance={table} />
                    <Table table={table} rowKeyField='id' columns={[{ key: 'id' }]} data={data} selectedRows={[1]} />
                </>
            );
        };
        const { container } = render(<TableWithInfo />);
        expect(container.querySelector('.selected-row')!.textContent).toBe('1');
        act(() => table.selectSingleRow(2));
        expect(container.querySelector('.selected-row')!.textContent).toBe('2');
    });
    it('stops updating the component after it is unmounted', () => {
        const SelectedRow = ({ tableInstance }: { tableInstance: ITableInstance }) => {
            const selectedRow = useTableSelector(tableInstance, (props) => props.selectedRows?.[0]);
            renders.push(selectedRow);
            return null;
        };
        const TableWithInfo = ({ showInfo }: { showInfo: boolean }) => {
            table = useTable();
            return (
                <>
                    {showInfo && <SelectedRow tableInstance={table} />}
                    <Table table={table} rowKeyField='id' columns={[{ key: 'id' }]} data={data} />
                </>
            );
        };
        const { rerender } = render(<TableWithInfo showInfo={true} />);
        rerender(<TableWithInfo showInfo={false} />);
        const rendersCount = renders.length;
        act(() => table.selectSingleRow(2));
        expect(renders.length).toBe(rendersCount);
    });
});

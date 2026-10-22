import * as React from 'react';

import { IKaTableProps, ITableInstance, Table } from '../..';
import { act, render } from '@testing-library/react';

import { useTable } from '../../hooks/UseTable';

const columns = [{ key: 'name', title: 'Name' }];
const createData = (count: number) => Array.from({ length: count }, (_, id) => ({ id, name: `name ${id}` }));

const setup = (tableProps: Partial<IKaTableProps> = {}) => {
    let table: ITableInstance;
    const TableWithInstance = (componentProps: IKaTableProps) => {
        table = useTable();
        return <Table table={table} {...componentProps} />;
    };
    const props: IKaTableProps = {
        columns,
        data: createData(35),
        rowKeyField: 'id',
        // the 4th page: the rows 30-34
        paging: { enabled: true, pageIndex: 3, pageSize: 10 },
        ...tableProps,
    };
    const result = render(<TableWithInstance {...props} />);
    const rerender = (newProps: Partial<IKaTableProps>) => result.rerender(<TableWithInstance {...props} {...newProps} />);
    const getRows = () => Array.from(result.container.querySelectorAll('tbody tr.ka-row')).map((row) => row.textContent);
    const getActivePage = () => result.container.querySelector('.ka-paging-page-index-active')?.textContent;
    return { ...result, getActivePage, getRows, rerender, table: () => table };
};

describe('paging', () => {
    it('shows the rows of the page', () => {
        const { getActivePage, getRows } = setup();
        expect(getRows()).toEqual(['name 30', 'name 31', 'name 32', 'name 33', 'name 34']);
        expect(getActivePage()).toBe('4');
    });
    it('shows the first page with the found rows', () => {
        const { getActivePage, getRows, table } = setup();
        act(() => table().search('name 1'));
        expect(table().props.paging!.pageIndex).toBe(0);
        expect(getRows()).toEqual(['name 1', 'name 10', 'name 11', 'name 12', 'name 13', 'name 14', 'name 15', 'name 16', 'name 17', 'name 18']);
        expect(getActivePage()).toBe('1');
    });
    it('keeps the first row of the page shown when the size of the pages is changed', () => {
        const { getActivePage, getRows, table } = setup();
        act(() => table().updatePageSize(20));
        expect(table().props.paging!.pageIndex).toBe(1);
        expect(getRows()).toContain('name 30');
        expect(getActivePage()).toBe('2');
    });
    it('shows the last page when the rows of the shown page are deleted', () => {
        const { getActivePage, getRows, table } = setup({ data: createData(31) });
        expect(getRows()).toEqual(['name 30']);
        act(() => table().deleteRow(30));
        expect(table().props.paging!.pageIndex).toBe(2);
        expect(getRows()).toEqual(Array.from({ length: 10 }, (_, index) => `name ${20 + index}`));
        expect(getActivePage()).toBe('3');
    });
    it('shows the last page when the rows are filtered: the page index is updated without the paging of the table', () => {
        const onDispatch = vi.fn();
        let table: ITableInstance;
        const CustomPagingTable = (props: { data: ReturnType<typeof createData> }) => {
            table = useTable({ onDispatch });
            return (
                <Table
                    table={table}
                    columns={columns}
                    data={props.data}
                    rowKeyField='id'
                    paging={{ enabled: true, pageIndex: 3, pageSize: 10 }}
                    childComponents={{
                        paging: {
                            content: ({ pageIndex = 0, pagesCount }) => <span className='custom-paging'>{`${pageIndex + 1} of ${pagesCount}`}</span>
                        }
                    }}
                />
            );
        };
        const { container, rerender } = render(<CustomPagingTable data={createData(35)} />);
        expect(container.querySelector('.custom-paging')!.textContent).toBe('4 of 4');
        // the parent component filters the rows
        rerender(<CustomPagingTable data={createData(15)} />);
        expect(container.querySelector('.custom-paging')!.textContent).toBe('2 of 2');
        expect(Array.from(container.querySelectorAll('tbody tr.ka-row')).map((row) => row.textContent))
            .toEqual(['name 10', 'name 11', 'name 12', 'name 13', 'name 14']);
        expect(table!.props.paging!.pageIndex).toBe(1);
    });
    it('shows the page of the server when the pages count is set', () => {
        const { getActivePage, getRows, table } = setup({
            data: createData(5),
            paging: { enabled: true, pageIndex: 3, pageSize: 5, pagesCount: 10 },
        });
        expect(getRows()).toEqual(['name 0', 'name 1', 'name 2', 'name 3', 'name 4']);
        expect(getActivePage()).toBe('4');
        expect(table().props.paging!.pageIndex).toBe(3);
    });
});

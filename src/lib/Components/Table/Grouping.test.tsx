import * as React from 'react';

import { ITableInstance, Table, useTable } from '../..';
import { act, fireEvent, render } from '@testing-library/react';

import { DataType } from '../../enums';

const getGroupRows = (container: HTMLElement) => Array.from(container.querySelectorAll('.ka-group-row')).map((row) => row.textContent);

describe('grouping', () => {
    it('groups by a date column with the format of its cells', () => {
        const columns = [{ key: 'date', title: 'Date', dataType: DataType.Date }, { key: 'name', title: 'Name' }];
        const data = [
            { id: 1, date: new Date(2021, 10, 8), name: 'a' },
            { id: 2, date: new Date(2021, 10, 8), name: 'b' },
            { id: 3, date: new Date(2021, 10, 9), name: 'c' },
        ];
        const { container } = render(
            <Table
                columns={columns}
                data={data}
                rowKeyField='id'
                groups={[{ columnKey: 'date' }]}
                // the format of the demos which works only with dates
                format={({ column, value }) => (column.dataType === DataType.Date ? value && value.toLocaleDateString('en-US') : undefined)}
            />
        );
        expect(getGroupRows(container)).toEqual(['11/8/2021', '11/9/2021']);
    });

    it('the groups of null and undefined are different groups', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        const { container } = render(
            <Table
                columns={[{ key: 'group', title: 'Group' }, { key: 'id', title: 'Id' }]}
                data={[{ id: 1, group: null }, { id: 2 }]}
                rowKeyField='id'
                groups={[{ columnKey: 'group' }]}
            />
        );
        expect(getGroupRows(container)).toEqual(['Group: null', 'Group: undefined']);
        expect(consoleError).not.toHaveBeenCalled();
        fireEvent.click(container.querySelector('.ka-icon-group-arrow')!);
        // the group of undefined stays expanded
        expect(Array.from(container.querySelectorAll('tbody tr.ka-row')).map((row) => row.textContent)).toEqual(['2']);
        consoleError.mockRestore();
    });

    it('shows the rows without the groups or with the disabled groups only', () => {
        const props = { columns: [{ key: 'type', title: 'Type' }, { key: 'name', title: 'Name' }], data: [{ id: 1, type: 'a', name: 'x' }], rowKeyField: 'id' };
        const { container, rerender } = render(<Table {...props} groups={[]} />);
        expect(container.querySelectorAll('tbody tr.ka-row')).toHaveLength(1);
        rerender(<Table {...props} groups={[{ columnKey: 'type', enabled: false }]} groupPanel={{ enabled: true, text: 'Drop a column' }} />);
        expect(getGroupRows(container)).toEqual([]);
        expect(container.querySelector('.ka-group-panel')!.textContent).toBe('Drop a column');
        expect(Array.from(container.querySelectorAll('thead th')).map((cell) => cell.textContent)).toEqual(['Type', 'Name']);
    });

    it('shows the summary of a group which is grouped again (#336)', () => {
        let table: ITableInstance;
        const App = () => {
            table = useTable();
            return (
                <Table
                    table={table}
                    columns={[{ key: 'type', title: 'Type' }, { key: 'name', title: 'Name' }]}
                    data={[{ id: 1, type: 'a', name: 'x' }, { id: 2, type: 'a', name: 'y' }]}
                    rowKeyField='id'
                    groups={[{ columnKey: 'type', enableSummary: true }]}
                    groupPanel={{ enabled: true }}
                />
            );
        };
        const { container } = render(<App />);
        expect(container.querySelectorAll('.ka-group-summary-row')).toHaveLength(1);
        fireEvent.click(container.querySelector('.ka-group-panel-cell-remove')!);
        expect(container.querySelectorAll('.ka-group-summary-row')).toHaveLength(0);
        expect(container.querySelectorAll('.ka-group-panel-cell')).toHaveLength(0);
        act(() => table!.groupColumn('type'));
        expect(getGroupRows(container)).toEqual(['Type: a']);
        expect(container.querySelectorAll('.ka-group-summary-row')).toHaveLength(1);
    });

    it('collapsing a group keeps the groups of the other pages expanded', () => {
        let table: ITableInstance;
        const App = () => {
            table = useTable();
            return (
                <Table
                    table={table}
                    columns={[{ key: 'country', title: 'Country' }, { key: 'id', title: 'Id' }]}
                    data={['A', 'B', 'C'].flatMap((country, index) => [0, 1, 2].map((i) => ({ id: index * 3 + i, country })))}
                    rowKeyField='id'
                    groups={[{ columnKey: 'country' }]}
                    paging={{ enabled: true, pageSize: 5 }}
                />
            );
        };
        const { container } = render(<App />);
        fireEvent.click(container.querySelector('.ka-icon-group-arrow')!);
        act(() => table!.updatePageIndex(1));
        expect(getGroupRows(container)).toEqual(['Country: C']);
        expect(Array.from(container.querySelectorAll('tbody tr.ka-row')).map((row) => row.textContent)).toEqual(['6', '7', '8']);
    });
});

import * as React from 'react';

import { ITableInstance, Table } from '../..';
import { fireEvent, render } from '@testing-library/react';

import { ActionType } from '../../enums';
import { useTable } from '../../hooks/UseTable';

describe('virtual scrolling', () => {
    it('measures the sizes once when the settings have them as undefined', async () => {
        const onDispatch = vi.fn();
        const TableWithInstance = () => {
            const table = useTable({ onDispatch });
            return (
                <Table
                    table={table}
                    columns={[{ key: 'name', title: 'Name' }]}
                    data={[{ id: 1, name: 'name 1' }, { id: 2, name: 'name 2' }]}
                    rowKeyField='id'
                    // e.g. itemHeight: props.rowHeight without rowHeight
                    virtualScrolling={{ enabled: true, itemHeight: undefined }}
                />
            );
        };
        const { container } = render(<TableWithInstance />);
        // onDispatch is called after the actions
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(onDispatch.mock.calls.filter(([action]) => action.type === ActionType.UpdateVirtualScrolling).length).toBe(1);
        expect(container.querySelectorAll('tbody tr.ka-row').length).toBe(2);
    });
});

describe('the scrolling position', () => {
    const rows = Array.from({ length: 100 }, (_, id) => ({ id, name: `name ${id}` }));
    it('is shown when the table is mounted again with the same instance', () => {
        let table: ITableInstance;
        const TableWithInstance = ({ shown }: { shown: boolean }) => {
            table = useTable();
            return shown ? (
                <Table
                    table={table}
                    columns={[{ key: 'name', title: 'Name' }]}
                    data={rows}
                    rowKeyField='id'
                    virtualScrolling={{ enabled: true, itemHeight: 40, tbodyHeight: 200 }}
                />
            ) : null;
        };
        const { container, rerender } = render(<TableWithInstance shown />);
        fireEvent.scroll(container.querySelector('.ka-table-wrapper')!, { target: { scrollTop: 2000 } });
        rerender(<TableWithInstance shown={false} />);
        rerender(<TableWithInstance shown />);
        expect(table!.props.virtualScrolling?.scrollTop).toBe(2000);
        expect(container.querySelector('.ka-table-wrapper')!.scrollTop).toBe(2000);
    });
    it('keeps the ref of the customization of the wrapper', () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container } = render(
            <Table
                columns={[{ key: 'name', title: 'Name' }]}
                data={rows}
                rowKeyField='id'
                childComponents={{ tableWrapper: { elementAttributes: () => ({ ref }) } }}
            />
        );
        expect(ref.current).toBe(container.querySelector('.ka-table-wrapper'));
    });
});

describe('virtual scrolling with enabled: false', () => {
    it('shows all the rows and does not measure them', async () => {
        const onDispatch = vi.fn();
        const TableWithInstance = () => {
            const table = useTable({ onDispatch });
            return (
                <Table
                    table={table}
                    columns={[{ key: 'name', title: 'Name' }]}
                    data={Array.from({ length: 100 }, (_, id) => ({ id, name: `name ${id}` }))}
                    rowKeyField='id'
                    virtualScrolling={{ enabled: false }}
                />
            );
        };
        const { container } = render(<TableWithInstance />);
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(container.querySelectorAll('tbody tr.ka-row').length).toBe(100);
        expect(onDispatch.mock.calls.filter(([action]) => action.type === ActionType.UpdateVirtualScrolling).length).toBe(0);
    });
});

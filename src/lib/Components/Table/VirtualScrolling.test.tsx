import * as React from 'react';

import { ActionType } from '../../enums';
import { Table } from '../..';
import { render } from '@testing-library/react';
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

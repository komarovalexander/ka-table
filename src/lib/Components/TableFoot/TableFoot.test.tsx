import React from 'react';
import { TableFoot } from './TableFoot';
import { createRoot } from 'react-dom/client';
import { ITableFootProps } from '../../props';

const props: ITableFootProps = {
    childComponents: {},
    columns: [
        { key: 'column' },
        { key: 'column2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: vi.fn(),
    groupColumnsCount: 0,
    rowKeyField: 'id',
};

it('renders without crashing', () => {
    const div = document.createElement('table');
    const root = createRoot(div!);
    root.render(<TableFoot {...props} />);
    root.unmount();
});

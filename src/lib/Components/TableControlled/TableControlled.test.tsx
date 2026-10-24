import React from 'react';
import { TableControlled } from './TableControlled';
import { createRoot } from 'react-dom/client';
import { ITableAllProps } from '../Table/Table';

const props: ITableAllProps = {
    columns: [
        { key: 'column' },
        { key: 'column2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: vi.fn(),
    rowKeyField: 'id',
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<TableControlled {...props} />);
    root.unmount();
});

import React from 'react';
import { SummaryRow } from './SummaryRow';
import { createRoot } from 'react-dom/client';
import { ISummaryRowProps } from '../../props';

const props: ISummaryRowProps = {
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
    const div = document.createElement('tbody');
    const root = createRoot(div!);
    root.render(<SummaryRow {...props} />);
    root.unmount();
});

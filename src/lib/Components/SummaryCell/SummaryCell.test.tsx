import React from 'react';
import { SummaryCell } from './SummaryCell';
import { createRoot } from 'react-dom/client';
import { ISummaryCellProps } from '../../props';

const props: ISummaryCellProps = {
    childComponents: {},
    column: { key: 'column'},
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
    const div = document.createElement('tr');
    const root = createRoot(div!);
    root.render(<SummaryCell {...props} />);
    root.unmount();
});

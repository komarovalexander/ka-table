import { GroupedColumnsRow } from './GroupedColumnsRow'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { IHeadRowProps } from '../../props'
import { SortingMode } from '../../enums'

const props: IHeadRowProps = {
    areAllRowsSelected: false,
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1' },
        { key: 'column2', title: 'Column 2' },
    ],
    dispatch: () => null,
    groupColumnsCount: 1,
    groupedColumns: [{
        key: 'grouped.column',
        title: 'Group 1',
        columnsKeys: ['column'],
    }],
    sortingMode: SortingMode.Single,
};

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    const root = createRoot(div!);
    root.render(<GroupedColumnsRow {...props} />);
    root.unmount();
});

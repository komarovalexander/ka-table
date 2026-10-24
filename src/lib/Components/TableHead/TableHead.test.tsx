import { FilteringMode, SortingMode } from '../../enums';
import React from 'react';
import { TableHead } from './TableHead';
import { createRoot } from 'react-dom/client';
import { ITableHeadProps } from '../../props';

const props: ITableHeadProps = {
    areAllRowsSelected: false,
    childComponents: {},
    columns: [
        { key: 'column' },
        { key: 'column2' },
    ],
    dispatch: vi.fn(),
    filteringMode: FilteringMode.None,
    groupColumnsCount: 0,
    sortingMode: SortingMode.None,
};

it('renders without crashing', () => {
    const div = document.createElement('table');
    const root = createRoot(div!);
    root.render(<TableHead {...props} />);
    root.unmount();
});

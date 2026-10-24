import React from 'react';
import { TablePaging } from './TablePaging';
import { createRoot } from 'react-dom/client';
import { ITableAllProps } from '../Table/Table';

const props = {
} as ITableAllProps;

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<TablePaging {...props} />);
    root.unmount();
});

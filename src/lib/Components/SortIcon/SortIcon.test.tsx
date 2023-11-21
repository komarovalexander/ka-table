import { ISortIconProps } from '../../props';
import React from 'react';
import SortIcon from './SortIcon';
import { createRoot } from 'react-dom/client';

const props: ISortIconProps = {
    childComponents: {},
    column: { key: 'column', title: 'Column 1'},
    dispatch: () => {}
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<SortIcon {...props} />);
    root.unmount();
});

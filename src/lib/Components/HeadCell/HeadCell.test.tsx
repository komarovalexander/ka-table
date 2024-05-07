import { Column } from '../../Models/Column';
import HeaderCell from './HeadCell';
import { IHeadCellProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IHeadCellProps = {
    column: new Column(),
    childComponents: {},
} as any;

it('renders without crashing', () => {
    const element = document.createElement('tr');
    const root = createRoot(element!);
    root.render(<HeaderCell {...props} />);
    root.unmount();
});

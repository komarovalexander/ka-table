import { INewRowProps } from '../../props';
import NewRow from './NewRow';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: INewRowProps = {
    childComponents: {},
    columns: [],
    groupColumnsCount: 0,
    dispatch: () => {},
    editableCells: [],
    rowKeyField: '',
} as any;

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    const root = createRoot(div!); 
    root.render(<NewRow  {...props} />);
    root.unmount();
});

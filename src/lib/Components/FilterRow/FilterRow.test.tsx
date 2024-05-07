import FilterRow from './FilterRow';
import { IFilterRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

let props: IFilterRowProps;

beforeEach(() => {
    props = {
        columns: [],
        dispatch: jest.fn(),
        groupColumnsCount: 0,
    } as any;
});

it('renders without crashing', () => {
    const element = document.createElement('tbody');
    const root = createRoot(element!);
    root.render(<FilterRow {...props} />);
    root.unmount();
});

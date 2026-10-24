import FilterRow from './FilterRow';
import { IFilterRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

let props: IFilterRowProps;

beforeEach(() => {
    props = {
        columns: [],
        dispatch: vi.fn(),
        groupColumnsCount: 0,
    } as IFilterRowProps;
});

it('renders without crashing', () => {
    const element = document.createElement('tbody');
    const root = createRoot(element!);
    root.render(<FilterRow {...props} />);
    root.unmount();
});

import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import React from 'react';
import { TableUncontrolled } from './TableUncontrolled';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
    columns: [
        { key: 'column', name: 'Column 1' },
        { key: 'column2', name: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: jest.fn(),
    rowKeyField: 'id',
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<TableUncontrolled {...props} />);
    root.unmount();
});

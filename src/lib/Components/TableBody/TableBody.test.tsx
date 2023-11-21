import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { EditingMode } from '../../enums';
import React from 'react';
import TableBody from './TableBody';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1' },
        { key: 'column2', title: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: jest.fn(),
    editableCells: [],
    editingMode: EditingMode.None,
    groupColumnsCount: 0,
    groupedColumns: [],
    rowKeyField: 'id',
    selectedRows: [],
};

afterEach(() => jest.clearAllMocks());

describe('TableBody', () => {
    it('renders without crashing', () => {
        const element = document.createElement('table');
        const root = createRoot(element!);
        root.render(<TableBody {...props} />);
        root.unmount();
    });
    it('add custom className', () => {
        const wrapper = mount((
            <TableBody {...props} childComponents={{
                tableBody: {
                    elementAttributes: () => ({
                        className: 'customClass'
                    })
                }
            }} />
        ), {
            attachTo: document.createElement('table'),
        });

        const tbody = wrapper.find('tbody');
        expect(tbody.hasClass('customClass')).toBeTruthy();
        expect(tbody.hasClass('ka-tbody')).toBeTruthy();
    });
});

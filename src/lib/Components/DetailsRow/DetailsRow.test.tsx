import { DataType, EditingMode } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import DetailsRow from './DetailsRow';
import { IRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IRowProps = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
    ],
    dispatch: () => {},
    editableCells: [],
    editingMode: EditingMode.None,
    isSelectedRow: false,
    groupColumnsCount: 0,
    rowData: [{ column: 1, column2: 2 }],
    rowKeyField: 'column',
    rowKeyValue: 1,
    selectedRows: [],
} as any;

it('renders without crashing', () => {
    const element = document.createElement('tbody');
    const root = createRoot(element!);
    root.render(<DetailsRow {...props} />);
    root.unmount();
});

it('Should add colSpan to details row', () => {
    const wrapper = mount(
        <DetailsRow
            {...props}
            childComponents={{
                detailsRow: {
                    content: () => <>Details Row</>,
                },
            }}
        />,
        {
            attachTo: document.createElement('tbody'),
        }
    );
    expect(wrapper.find('td').props().colSpan).toBe(2);
    expect(wrapper.find('td').text()).toBe('Details Row');
});

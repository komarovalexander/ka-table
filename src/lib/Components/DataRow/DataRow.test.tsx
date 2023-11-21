import { DataType, EditingMode } from '../../enums';
import Enzyme, { mount, shallow } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import DataRow from './DataRow';
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
    groupColumnsCount: 0,
    isSelectedRow: false,
    rowData: [{ column: 1, column2: 2 }],
    rowEditableCells: [],
    rowKeyField: 'column',
    rowKeyValue: 1,
    selectedRows: [],
} as any;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('DataRow', () => {
    it('renders without crashing', () => {
        const element = document.createElement('tbody');
        const root = createRoot(element!);
    root.render(<DataRow {...props} />);
        root.unmount();
    });

    it('renders with draggable', () => {
        const component = shallow(<DataRow {...props} rowReordering={true} />);
        expect(component.props().draggable).toBeTruthy();
    });

    it('renders without draggable', () => {
        const component = shallow(<DataRow {...props} />);
        expect(component.props().draggable).toBeFalsy();
    });

    it('overrides default ref', () => {
        const ref = jest.fn();
        mount(
            <DataRow
                {...props}
                childComponents={{
                    dataRow: { elementAttributes: () => ({ ref }) },
                }}
            />,
            {
                attachTo: document.createElement('tbody'),
            }
        );
        expect(ref).toBeCalled();
    });
});

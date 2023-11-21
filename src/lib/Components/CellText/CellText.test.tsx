import { ActionType, DataType, EditingMode } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import CellText from './CellText';
import { ICellTextProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: ICellTextProps = {
    childComponents: {},
    column: {
        dataType: DataType.String,
        key: 'columnField',
        title: 'Field',
    },
    dispatch: jest.fn(),
    editingMode: EditingMode.Cell,
    field: 'columnField',
    isSelectedRow: false,
    rowData: { columnField: 'columnFieldValue', id: 1 },
    rowKeyField: 'id',
    rowKeyValue: 1,
    value: 'columnFieldValue',
} as any;

afterEach(() => jest.clearAllMocks());

describe('CellText', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
    root.render(<CellText {...props} />);
        root.unmount();
    });

    it('should dispatch OpenEditor', () => {
        const wrapper = mount(<CellText {...props} />);

        wrapper.find('.ka-cell-text').simulate('click');
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            type: ActionType.OpenEditor,
            columnKey: 'columnField',
            rowKeyValue: 1,
        });
    });

    it('should skip OpenEditor', () => {
        const wrapper = mount(
            <CellText {...props} editingMode={EditingMode.None} />
        );
        wrapper.find('.ka-cell-text').simulate('click');
        expect(props.dispatch).toBeCalledTimes(0);
    });
});

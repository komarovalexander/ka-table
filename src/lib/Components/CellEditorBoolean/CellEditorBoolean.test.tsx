import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import CellEditorBoolean from './CellEditorBoolean';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });
const props: ICellEditorProps = {
    column: {
        dataType: DataType.String,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: jest.fn(),
    field: 'fieldName',
    isSelectedRow: false,
    rowData: { fieldName: 'columnFieldValue', id: 2 },
    rowKeyField: 'id',
    rowKeyValue: 2,
    value: 'columnFieldValue',
} as any;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('CellEditorBoolean', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        root.render(<CellEditorBoolean {...props} />);
        root.unmount();
    });

    it('should dispatch RowDataChanged', () => {
        const newValue = false;
        const wrapper = mount(<CellEditorBoolean {...props} />);

        wrapper.find('input').props().onChange!({
            currentTarget: { checked: newValue },
        } as any);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 2,
            oldValue: 'columnFieldValue',
            type: ActionType.UpdateCellValue,
            value: false,
        });
    });

    it('should dispatch CloseEditor', () => {
        const wrapper = mount(<CellEditorBoolean {...props} />);

        wrapper.find('input').props().onBlur!({} as any);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 2,
        });
    });
});

import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import CellEditorDate from './CellEditorDate';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });
const props: ICellEditorProps = {
    column: {
        dataType: DataType.Date,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: jest.fn(),
    field: 'fieldName',
    isSelectedRow: true,
    rowData: { fieldName: new Date(2020, 0, 2), id: 2 },
    rowKeyField: 'id',
    rowKeyValue: 2,
} as any;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('CellEditorDate', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
    root.render(<CellEditorDate {...props} />);
        root.unmount();
    });

    it('should fire RowDataChanged', () => {
        const newValue = new Date(2020, 1, 2);
        const wrapper = mount(<CellEditorDate {...props} />);

        wrapper.find('input').props().onChange!({
            currentTarget: { value: newValue },
        } as any);
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 2,
            type: ActionType.UpdateCellValue,
            value: new Date(newValue.getTime() + newValue.getTimezoneOffset() * 60000), // https://github.com/komarovalexander/ka-table/issues/279
        });
    });

    it('should dispatch CloseEditor', () => {
        const wrapper = mount(<CellEditorDate {...props} />);

        wrapper.find('input').props().onBlur!({} as any);
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 2,
        });
    });
});

import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import CellEditorString from './CellEditorString';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

let props: ICellEditorProps;

beforeEach(() => {
    props = {
        column: {
            dataType: DataType.String,
            key: 'fieldName',
            title: 'Field',
        },
        dispatch: jest.fn(),
        field: 'fieldName',
        isSelectedRow: true,
        rowData: { fieldName: 'fieldNameText', id: 1 },
        rowKeyField: 'id',
        rowKeyValue: 1,
    } as any;
});

describe('CellEditorNumber', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
    root.render(<CellEditorString {...props} />);
        root.unmount();
    });

    it('should fire RowDataChanged', () => {
        const newValue = 'fieldNameUpdatedText';
        const wrapper = mount(<CellEditorString {...props} />);

        wrapper.find('input').props().onChange!({
            currentTarget: { value: newValue },
        } as any);
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 1,
            type: ActionType.UpdateCellValue,
            value: newValue,
        });
    });

    it('should fire CloseEditor on blur', () => {
        const wrapper = mount(<CellEditorString {...props} />);
        wrapper.find('input').simulate('blur');

        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 1,
        });
    });
});

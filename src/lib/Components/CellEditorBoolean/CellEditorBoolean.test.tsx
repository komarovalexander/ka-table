import { ActionType, DataType } from '../../enums';
import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CellEditorBoolean from './CellEditorBoolean';
import { ICellEditorProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

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
        ReactDOM.render(<CellEditorBoolean {...props} />, element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it('should dispatch RowDataChanged', () => {
        const newValue = false;
        const wrapper = mount(<CellEditorBoolean {...props} />);

        wrapper.find('input').props().onChange!({
            currentTarget: { checked: newValue },
        } as any);
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 2,
            type: ActionType.UpdateCellValue,
            value: false,
        });
    });

    it('should dispatch CloseEditor', () => {
        const wrapper = mount(<CellEditorBoolean {...props} />);

        wrapper.find('input').props().onBlur!({} as any);
        expect(props.dispatch).toBeCalledTimes(1);
        expect(props.dispatch).toBeCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 2,
        });
    });
});

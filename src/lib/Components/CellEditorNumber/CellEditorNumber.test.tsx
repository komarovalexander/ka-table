import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorNumber from './CellEditorNumber';

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
    rowData: { fieldName: 1, id: 1 },
    rowKeyField: 'id',
    rowKeyValue: 1,
  };
});

describe('CellEditorNumber', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellEditorNumber {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should fire RowDataChanged', () => {
    const newValue = 2;
    const wrapper = mount(<CellEditorNumber {...props} />);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith({
      columnKey: 'fieldName',
      rowKeyValue: 1,
      type: ActionType.ChangeCellValue,
      value: newValue,
    });
  });

  it('should fire CloseEditor on blur', () => {
    const wrapper = mount(<CellEditorNumber {...props} />);
    wrapper.find('input').simulate('blur');

    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      { type: ActionType.CloseEditor, columnKey: 'fieldName', rowKeyValue: 1 },
    );
  });
});

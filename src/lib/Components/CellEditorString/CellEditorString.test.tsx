import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorString from './CellEditorString';

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
  };
});

describe('CellEditorNumber', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellEditorString {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should fire RowDataChanged', () => {
    const newValue = 'fieldNameUpdatedText';
    const wrapper = mount(<CellEditorString {...props} />);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      ActionType.ChangeRowData, { newValue: { fieldName: newValue, id: 1 } },
    );
  });

  it('should fire CloseEditor on blur', () => {
    const wrapper = mount(<CellEditorString {...props} />);
    wrapper.find('input').simulate('blur');

    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      ActionType.CloseEditor, { cell: { columnKey: 'fieldName', rowKey: 1 } },
    );
  });
});

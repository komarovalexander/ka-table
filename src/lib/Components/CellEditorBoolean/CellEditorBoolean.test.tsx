import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ActionType, DataType } from '../../enums';
import { ICellEditorProps } from '../../props';
import CellEditorBoolean from './CellEditorBoolean';

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
};

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

    wrapper.find('input').props().onChange!({currentTarget: { checked: newValue} } as any);
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
    expect(props.dispatch).toBeCalledWith(
      { type: ActionType.CloseEditor, columnKey: 'fieldName', rowKeyValue: 2 },
    );
  });
});

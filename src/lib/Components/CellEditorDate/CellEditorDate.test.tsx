import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDate from './CellEditorDate';

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
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CellEditorDate', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellEditorDate {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should fire RowDataChanged', () => {
    const newValue = new Date(2020, 1, 2);
    const wrapper = mount(<CellEditorDate {...props} />);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith({
      type: ActionType.ChangeCellValue,
      ...{ newValue: { fieldName: newValue, id: 2 } },
    });
  });

  it('should dispatch CloseEditor', () => {
    const wrapper = mount(<CellEditorDate {...props} />);

    wrapper.find('input').props().onBlur!({} as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      ActionType.CloseEditor, { cell: { columnKey: 'fieldName', rowKeyValue: 2 } },
    );
  });
});

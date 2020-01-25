import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorBoolean from './CellEditorBoolean';

Enzyme.configure({ adapter: new Adapter() });
const props: ICellEditorProps = {
  column: {
    dataType: DataType.Boolean,
    key: 'fieldName',
    title: 'Field',
  },
  dispatch: jest.fn(),
  field: 'fieldName',
  isSelectedRow: true,
  rowData: { fieldName: true, id: 2 },
  rowKeyField: 'id',
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
    expect(props.dispatch).toBeCalledWith(
      ActionType.ChangeRowData, { newValue: { fieldName: newValue, id: 2 } },
    );
  });

  it('should dispatch CloseEditor', () => {
    const wrapper = mount(<CellEditorBoolean {...props} />);

    wrapper.find('input').props().onBlur!({} as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      ActionType.CloseEditor, { cell: { columnKey: 'fieldName', rowKey: 2 } },
    );
  });
});

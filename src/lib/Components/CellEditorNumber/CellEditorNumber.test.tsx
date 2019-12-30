import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, Events } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorNumber from './CellEditorNumber';

Enzyme.configure({ adapter: new Adapter() });
const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'fieldName',
    title: 'Field',
  },
  dispatch: jest.fn(),
  field: 'fieldName',
  isSelectedRow: true,
  rowData: { column: 1 },
  rowKeyField: '',
};

describe('CellEditorNumber', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellEditorNumber {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should fire RowDataChanged', () => {
    const newValue = 2;
    const rowData = { fieldName: 1 };
    const wrapper = mount(<CellEditorNumber {...props} rowData={rowData} />);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      Events.RowDataChanged, { newValue: { fieldName: newValue } },
    );
  });
});

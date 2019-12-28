import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, Events } from '../../enums';
import CellEditor from '../CellEditor/CellEditor';
import CellComponent from './CellComponent';

Enzyme.configure({ adapter: new Adapter() });
const props: any = {
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  editableCells: [],
  isEditableCell: false,
  onOptionChange: () => {},
  rowData: {
    column: 1,
  },
  rowKey: '1',
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellComponent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('call RowDataChanged when onValueChange', () => {
  const dispatch = jest.fn();
  const newValue = {a: 1};
  const wrapper = mount(
    <CellComponent {...props} isEditableCell='true' dispatch={dispatch} />,
    {
      attachTo: document.createElement('tr'),
    },
  );
  wrapper.find(CellEditor).last().prop('onValueChange')(newValue);
  expect(dispatch).toBeCalledTimes(1);
  expect(dispatch).toBeCalledWith(Events.RowDataChanged, {newValue});
});

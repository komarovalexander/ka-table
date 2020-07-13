import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, EditingMode } from '../../enums';
import { IRowProps } from '../DataRow/DataRow';
import DetailsRow from './DetailsRow';

Enzyme.configure({ adapter: new Adapter() });

const props: IRowProps = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  dispatch: () => {},
  detailsRow: () => <>Details Row</>,
  editableCells: [],
  editingMode: EditingMode.None,
  isSelectedRow: false,
  groupColumnsCount: 0,
  rowData: [{ column: 1, column2: 2 }],
  rowKeyField: 'column',
  rowKeyValue: 1,
  selectedRows: [],
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<DetailsRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('Should add colSpan to details row', () => {
  const wrapper = mount(<DetailsRow {...props} />, {
    attachTo: document.createElement('tbody'),
  });
  expect(wrapper.find('td').props().colSpan).toBe(2);
});

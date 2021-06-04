import Enzyme from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DataType, EditingMode } from '../../enums';
import CellComponent, { ICellProps } from './CellComponent';

Enzyme.configure({ adapter: new Adapter() });

const props: ICellProps = {
  childComponents: {},
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: () => {},
  editingMode: EditingMode.None,
  isEditableCell: false,
  isSelectedRow: false,
  rowData: {
    column: 1,
  },
  rowKeyField: '1',
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellComponent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, EditingMode } from '../../enums';
import CellContent, { ICellContentProps } from './CellContent';

const props: ICellContentProps = {
  childAttributes: {},
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: () => {},
  editingMode: EditingMode.None,
  field: 'columnField',
  rowData: { column : 1 },
  rowKeyField: '',
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellContent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

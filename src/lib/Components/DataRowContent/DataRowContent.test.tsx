import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, EditingMode } from '../../enums';
import DataRowContent, { IDataRowProps } from './DataRowContent';

const props: IDataRowProps = {
  childAttributes: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  dispatch: () => {},
  editableCells: [],
  editingMode: EditingMode.None,
  isSelectedRow: false,
  rowData: [{ column: 1, column2: 2 }],
  rowKeyField: 'column',
  selectedRows: [],
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<DataRowContent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

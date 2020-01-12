import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, EditingMode } from '../../enums';
import DataRow, { IRowProps } from './DataRow';

const props: IRowProps = {
  childAttributes: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  dispatch: () => {},
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 0,
  rowData: [{ column: 1, column2: 2 }],
  rowKeyField: 'column',
  selectedRows: [],
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<DataRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

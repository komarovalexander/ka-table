import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, EditingMode } from '../../enums';
import { IRowProps } from '../DataRow/DataRow';
import DetailsRow from './DetailsRow';

const props: IRowProps = {
  childAttributes: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  dispatch: () => {},
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

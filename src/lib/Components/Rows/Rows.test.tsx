import React from 'react';
import ReactDOM from 'react-dom';

import { EditingMode } from '../../enums';
import { ITableBodyProps } from '../TableBody/TableBody';
import Rows from './Rows';

const tableProps: ITableBodyProps = {
  childAttributes: {},
  columns: [
    { key: 'column', title: 'Column 1' },
    { key: 'column2', title: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  dispatch: () => {},
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 0,
  groupedColumns: [],
  onOptionChange: () => {},
  rowKeyField: 'id',
  selectedRows: [],
};

it('renders without crashing', () => {
  const div = document.createElement('tbody');
  ReactDOM.render(<Rows {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

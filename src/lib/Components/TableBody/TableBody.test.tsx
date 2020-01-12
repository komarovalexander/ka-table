import React from 'react';
import ReactDOM from 'react-dom';

import { EditingMode } from '../../enums';
import TableBody from './TableBody';

const tableProps: any = {
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
  const div = document.createElement('table');
  ReactDOM.render(<TableBody {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

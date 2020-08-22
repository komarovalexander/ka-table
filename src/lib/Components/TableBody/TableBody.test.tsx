import React from 'react';
import ReactDOM from 'react-dom';

import { EditingMode } from '../../enums';
import TableBody from './TableBody';

const props: any = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1' },
    { key: 'column2', title: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  dispatch: jest.fn(),
  editableCells: [],
  editingMode: EditingMode.None,
  groupColumnsCount: 0,
  groupedColumns: [],
  rowKeyField: 'id',
  selectedRows: [],
};

afterEach(() => jest.clearAllMocks());

describe('TableBody', () => {
  it('renders without crashing', () => {
    const element = document.createElement('table');
    ReactDOM.render(<TableBody {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });
});

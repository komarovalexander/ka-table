import React from 'react';
import ReactDOM from 'react-dom';

import TableBody from './TableBody';

const tableProps: any = {
  columns: [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  rowKeyField: 'id',
};

it('renders without crashing', () => {
  const div = document.createElement('table');
  ReactDOM.render(<TableBody {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

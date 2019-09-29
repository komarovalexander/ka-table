import React from 'react';
import ReactDOM from 'react-dom';

import DataGrid from './DataGrid';

const dataGridProps = {
  columns: [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  rowKey: 'id',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataGrid {...dataGridProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

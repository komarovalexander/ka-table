import React from 'react';
import ReactDOM from 'react-dom';

import Row, { IRowProps } from './Row';

const props: IRowProps = {
  columns: [
    { field: 'column', title: 'Column 1' },
    { field: 'column2', title: 'Column 2' },
  ],
  rowData: [{ column: 1, column2: 2 }],
  rowKey: 'column',
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<Row {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

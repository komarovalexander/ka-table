import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import DataRow from './DataRow';

const props: any = {
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  rowData: [{ column: 1, column2: 2 }],
  rowKey: 'column',
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<DataRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

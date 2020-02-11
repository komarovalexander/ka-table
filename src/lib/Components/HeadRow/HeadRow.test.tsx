import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import HeaderRow from './HeadRow';

const props: any = {
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
};

it('renders without crashing', () => {
  const element = document.createElement('thead');
  ReactDOM.render(<HeaderRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

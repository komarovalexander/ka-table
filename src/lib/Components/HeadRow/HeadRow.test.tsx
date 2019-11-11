import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import HeaderRow, { IHeadRowProps } from './HeadRow';

const props: any = {
  columns: [
    { field: 'column', title: 'Column 1', dataType: DataType.String },
    { field: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
  onOptionChanged: () => { },
};

it('renders without crashing', () => {
  const element = document.createElement('thead');
  ReactDOM.render(<HeaderRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

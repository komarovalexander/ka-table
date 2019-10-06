import React from 'react';
import ReactDOM from 'react-dom';

import HeaderRow, { IHeadRowProps } from './HeadRow';

const props: IHeadRowProps = {
  columns: [
    { field: 'column', title: 'Column 1' },
    { field: 'column2', title: 'Column 2' },
  ],
  onOptionChanged: () => { },
};

it('renders without crashing', () => {
  const element = document.createElement('thead');
  ReactDOM.render(<HeaderRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

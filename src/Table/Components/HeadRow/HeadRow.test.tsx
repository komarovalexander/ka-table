import React from 'react';
import ReactDOM from 'react-dom';

import HeaderRow from './HeadRow';

const props = {
  columns: [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  data: [{ column: 1, column2: 2 }],
};

it('renders without crashing', () => {
  const element = document.createElement('thead');
  ReactDOM.render(<HeaderRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

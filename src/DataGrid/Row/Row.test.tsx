import React from 'react';
import ReactDOM from 'react-dom';

import Row from './Row';

const props = {
  columns: [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  data: [{ column: 1, column2: 2 }],
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<Row {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import ColumnResizingDemo from './ColumnResizingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ColumnResizingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

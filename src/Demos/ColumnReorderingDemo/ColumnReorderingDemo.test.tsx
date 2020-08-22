import React from 'react';
import ReactDOM from 'react-dom';

import ColumnReorderingDemo from './ColumnReorderingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ColumnReorderingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

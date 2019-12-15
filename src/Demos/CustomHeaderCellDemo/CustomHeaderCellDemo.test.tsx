import React from 'react';
import ReactDOM from 'react-dom';

import CustomHeaderCellDemo from './CustomHeaderCellDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomHeaderCellDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

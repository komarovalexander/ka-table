import React from 'react';
import ReactDOM from 'react-dom';

import CustomCellDemo from './CustomCellDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomCellDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

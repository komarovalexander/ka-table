import React from 'react';
import ReactDOM from 'react-dom';

import CustomPagingDemo from './CustomPagingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomPagingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

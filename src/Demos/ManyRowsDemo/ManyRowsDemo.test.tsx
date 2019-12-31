import React from 'react';
import ReactDOM from 'react-dom';

import ManyRowsDemo from './ManyRowsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManyRowsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import PagingDemo from './PagingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PagingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

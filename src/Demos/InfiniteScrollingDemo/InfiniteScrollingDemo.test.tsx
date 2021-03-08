import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteScrollingDemo from './InfiniteScrollingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InfiniteScrollingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

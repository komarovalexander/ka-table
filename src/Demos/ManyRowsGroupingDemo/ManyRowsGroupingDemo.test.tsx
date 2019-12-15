import React from 'react';
import ReactDOM from 'react-dom';

import ManyRowsGroupingDemo from './ManyRowsGroupingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManyRowsGroupingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import ManyRowsMemoDemo from './ManyRowsMemoDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManyRowsMemoDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

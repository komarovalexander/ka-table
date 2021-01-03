import React from 'react';
import ReactDOM from 'react-dom';

import TabIndexDemo from './TabIndexDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TabIndexDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

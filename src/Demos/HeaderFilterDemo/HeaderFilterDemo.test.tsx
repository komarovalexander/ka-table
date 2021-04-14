import React from 'react';
import ReactDOM from 'react-dom';

import HeaderFilterDemo from './HeaderFilterDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderFilterDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import KeyboardNavigationDemo from './KeyboardNavigationDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<KeyboardNavigationDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

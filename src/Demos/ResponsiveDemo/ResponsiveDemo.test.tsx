import React from 'react';
import ReactDOM from 'react-dom';

import ResponsiveDemo from './ResponsiveDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResponsiveDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

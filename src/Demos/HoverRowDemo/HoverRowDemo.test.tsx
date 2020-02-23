import React from 'react';
import ReactDOM from 'react-dom';

import HoverRowDemo from './HoverRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HoverRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

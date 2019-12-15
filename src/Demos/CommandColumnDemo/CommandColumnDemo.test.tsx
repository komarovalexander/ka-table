import React from 'react';
import ReactDOM from 'react-dom';

import CommandColumnDemo from './CommandColumnDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommandColumnDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

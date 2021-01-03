import React from 'react';
import ReactDOM from 'react-dom';

import PrintDemo from './PrintDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PrintDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

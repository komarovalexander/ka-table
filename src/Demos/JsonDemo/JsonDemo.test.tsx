import React from 'react';
import ReactDOM from 'react-dom';

import JsonDemo from './JsonDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JsonDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

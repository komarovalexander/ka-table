import React from 'react';
import ReactDOM from 'react-dom';

import EditingDemo from './EditingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

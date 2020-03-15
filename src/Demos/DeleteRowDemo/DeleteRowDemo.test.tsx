import React from 'react';
import ReactDOM from 'react-dom';

import DeleteRowDemo from './DeleteRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

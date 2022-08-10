import React from 'react';
import ReactDOM from 'react-dom';

import InsertRowDemo from './InsertRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InsertRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

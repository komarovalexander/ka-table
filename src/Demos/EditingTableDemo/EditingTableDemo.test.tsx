import React from 'react';
import ReactDOM from 'react-dom';

import EditingTableDemo from './EditingTableDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditingTableDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

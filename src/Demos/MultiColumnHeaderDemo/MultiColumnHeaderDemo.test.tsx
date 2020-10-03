import React from 'react';
import ReactDOM from 'react-dom';

import MultiColumnHeaderDemo from './MultiColumnHeaderDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MultiColumnHeaderDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

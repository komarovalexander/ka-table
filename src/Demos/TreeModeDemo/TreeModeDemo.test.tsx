import React from 'react';
import ReactDOM from 'react-dom';

import TreeModeDemo from './TreeModeDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TreeModeDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

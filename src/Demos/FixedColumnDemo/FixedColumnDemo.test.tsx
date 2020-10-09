import React from 'react';
import ReactDOM from 'react-dom';

import FixedColumnDemo from './FixedColumnDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FixedColumnDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

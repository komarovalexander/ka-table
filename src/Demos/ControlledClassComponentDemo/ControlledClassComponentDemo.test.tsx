import React from 'react';
import ReactDOM from 'react-dom';

import ControlledClassComponentDemo from './ControlledClassComponentDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ControlledClassComponentDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

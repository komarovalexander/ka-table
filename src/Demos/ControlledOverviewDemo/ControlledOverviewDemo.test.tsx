import React from 'react';
import ReactDOM from 'react-dom';

import ControlledOverviewDemo from './ControlledOverviewDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ControlledOverviewDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

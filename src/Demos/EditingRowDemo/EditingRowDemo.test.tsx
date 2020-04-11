import React from 'react';
import ReactDOM from 'react-dom';

import EditingDemoRow from './EditingRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditingDemoRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});

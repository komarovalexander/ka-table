import React from 'react';
import ReactDOM from 'react-dom';

import AlertCell from './AlertCellDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AlertCell />, div);
  ReactDOM.unmountComponentAtNode(div);
});

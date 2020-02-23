import React from 'react';
import ReactDOM from 'react-dom';

import SelectionSingleDemo from './SelectionSingleDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectionSingleDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import MaterialDemo from './MaterialDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MaterialDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import StateStoringDemo from './StateStoringDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StateStoringDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

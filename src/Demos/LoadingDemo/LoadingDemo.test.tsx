import React from 'react';
import ReactDOM from 'react-dom';

import LoadingDemo from './LoadingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoadingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

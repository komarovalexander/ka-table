import React from 'react';
import ReactDOM from 'react-dom';

import ManyColumnsDemo from './ManyColumnsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManyColumnsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

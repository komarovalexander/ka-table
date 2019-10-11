import React from 'react';
import ReactDOM from 'react-dom';

import FilterRowDemo from './FilterRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

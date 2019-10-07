import React from 'react';
import ReactDOM from 'react-dom';

import SortingDemo from './SortingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SortingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import SortingModesDemo from './SortingModesDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SortingModesDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

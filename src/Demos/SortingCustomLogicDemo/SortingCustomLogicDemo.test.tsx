import React from 'react';
import ReactDOM from 'react-dom';

import SortingCustomLogicDemo from './SortingCustomLogicDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SortingCustomLogicDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

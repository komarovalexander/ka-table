import React from 'react';
import ReactDOM from 'react-dom';

import FilterRowCustomLogicDemo from './FilterRowCustomLogicDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterRowCustomLogicDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

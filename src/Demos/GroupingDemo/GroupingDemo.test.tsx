import React from 'react';
import ReactDOM from 'react-dom';

import GroupingDemo from './GroupingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

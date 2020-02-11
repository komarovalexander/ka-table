import React from 'react';
import ReactDOM from 'react-dom';

import GroupingCustomRowDemo from './GroupingCustomRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupingCustomRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

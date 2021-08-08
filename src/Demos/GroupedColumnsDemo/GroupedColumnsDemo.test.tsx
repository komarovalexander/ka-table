import React from 'react';
import ReactDOM from 'react-dom';

import GroupedColumnsDemo from './GroupedColumnsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupedColumnsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

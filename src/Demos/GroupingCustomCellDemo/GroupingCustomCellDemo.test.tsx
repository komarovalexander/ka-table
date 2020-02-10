import React from 'react';
import ReactDOM from 'react-dom';

import GroupingCustomCellDemo from './GroupingCustomCellDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupingCustomCellDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

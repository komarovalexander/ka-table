import React from 'react';
import ReactDOM from 'react-dom';

import OverviewDemo from './ClassComponentDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OverviewDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

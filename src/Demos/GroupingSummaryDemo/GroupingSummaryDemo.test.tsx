import React from 'react';
import ReactDOM from 'react-dom';

import GroupingSummaryDemo from './GroupingSummaryDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupingSummaryDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

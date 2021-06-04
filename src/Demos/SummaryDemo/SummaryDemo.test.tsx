import React from 'react';
import ReactDOM from 'react-dom';

import SummaryDemo from './SummaryDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummaryDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

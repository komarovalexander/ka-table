import React from 'react';
import ReactDOM from 'react-dom';

import GroupedHeaderColumnsDemo from './GroupedHeaderColumnsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupedHeaderColumnsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

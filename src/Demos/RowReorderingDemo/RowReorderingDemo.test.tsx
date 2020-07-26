import React from 'react';
import ReactDOM from 'react-dom';

import RowReorderingDemo from './RowReorderingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RowReorderingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

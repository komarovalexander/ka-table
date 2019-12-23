import React from 'react';
import ReactDOM from 'react-dom';

import CustomDataRowDemo from './CustomDataRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomDataRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import CustomAttributesDemo from './CustomAttributesDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomAttributesDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

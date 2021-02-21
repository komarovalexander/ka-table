import React from 'react';
import ReactDOM from 'react-dom';

import ManyRowsDynamicDemo from './ManyRowsDynamicDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManyRowsDynamicDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

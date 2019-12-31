import React from 'react';
import ReactDOM from 'react-dom';

import ValidationDemo from './ValidationDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ValidationDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import SelectionDemo from './SelectionDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectionDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

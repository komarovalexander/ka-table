import React from 'react';
import ReactDOM from 'react-dom';

import AddRowDemo from './AddRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

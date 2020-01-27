import React from 'react';
import ReactDOM from 'react-dom';

import NullableCellDataDemo from './NullableCellDataDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NullableCellDataDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

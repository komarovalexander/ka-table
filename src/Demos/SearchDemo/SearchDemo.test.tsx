import React from 'react';
import ReactDOM from 'react-dom';

import SearchDemo from './SearchDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

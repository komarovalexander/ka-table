import React from 'react';
import ReactDOM from 'react-dom';

import FilterExtendedDemo from './FilterExtendedDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterExtendedDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

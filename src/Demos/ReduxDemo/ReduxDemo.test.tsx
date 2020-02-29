import React from 'react';
import ReactDOM from 'react-dom';

import ReduxDemo from './ReduxDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReduxDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

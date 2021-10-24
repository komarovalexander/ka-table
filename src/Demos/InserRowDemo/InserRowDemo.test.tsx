import React from 'react';
import ReactDOM from 'react-dom';

import InserRowDemo from './InserRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InserRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

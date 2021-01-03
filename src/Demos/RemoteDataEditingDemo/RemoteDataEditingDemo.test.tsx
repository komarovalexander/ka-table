import React from 'react';
import ReactDOM from 'react-dom';

import RemoteDataEditingDemo from './RemoteDataEditingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteDataEditingDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

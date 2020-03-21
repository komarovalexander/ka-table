import React from 'react';
import ReactDOM from 'react-dom';

import RemoteDataDemo from './RemoteDataDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteDataDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

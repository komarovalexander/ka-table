import React from 'react';
import ReactDOM from 'react-dom';

import GetDataByPropsDemo from './GetDataByPropsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GetDataByPropsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

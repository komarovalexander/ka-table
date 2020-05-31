import React from 'react';
import ReactDOM from 'react-dom';

import DetailsRowDemo from './DetailsRowDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DetailsRowDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

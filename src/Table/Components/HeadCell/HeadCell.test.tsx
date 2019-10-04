import React from 'react';
import ReactDOM from 'react-dom';

import HeaderCell from './HeadCell';

const props = {
  text: 'testText',
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<HeaderCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

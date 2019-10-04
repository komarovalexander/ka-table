import React from 'react';
import ReactDOM from 'react-dom';

import Cell from './Cell';

const props = {
  text: 'testText',
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<Cell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

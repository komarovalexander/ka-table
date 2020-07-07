import React from 'react';
import ReactDOM from 'react-dom';

import { Column } from '../../Models/Column';
import HeadCellResize from './HeadCellResize';

const props = {
  column: new Column(),
  dispatch: () => {},
  currentWidth: 100,
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<HeadCellResize {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

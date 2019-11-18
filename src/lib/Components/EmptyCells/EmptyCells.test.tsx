import React from 'react';
import ReactDOM from 'react-dom';

import EmptyCells, { IEmptyCellsProps } from './EmptyCells';

const props: IEmptyCellsProps = {
  count: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<EmptyCells {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import { IEmptyCellsProps } from '../../props';
import EmptyCells from './EmptyCells';

const props: IEmptyCellsProps = {
  count: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<EmptyCells {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('renders without crashing with isTh', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<EmptyCells {...props} isTh={true}/>, element);
  ReactDOM.unmountComponentAtNode(element);
});

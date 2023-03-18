import EmptyCell from './EmptyCell';
import { IEmptyCellProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

const props: IEmptyCellProps = {
  index: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<EmptyCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('renders without crashing with isTh', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<EmptyCell {...props} isTh={true}/>, element);
  ReactDOM.unmountComponentAtNode(element);
});

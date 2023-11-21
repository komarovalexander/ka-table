import EmptyCell from './EmptyCell';
import { IEmptyCellProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: IEmptyCellProps = {
  index: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  const root = createRoot(element!);
  root.render(<EmptyCell {...props} />);
  root.unmount();
});

it('renders without crashing with isTh', () => {
  const element = document.createElement('tr');
  const root = createRoot(element!);
  root.render(<EmptyCell {...props} isTh={true}/>);
  root.unmount();
});

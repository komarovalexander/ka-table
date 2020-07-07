import React from 'react';
import ReactDOM from 'react-dom';

import { Column } from '../../Models/Column';
import { HeadCellResizeStateAction } from '../HeadCellResize/HeadCellResize';
import HeaderCell, { headCellDispatchWrapper, IHeadCellProps } from './HeadCell';

const props: IHeadCellProps = {
  column: new Column(),
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<HeaderCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('headCellDispatchWrapper', () => {
  const setWidth = jest.fn();
  const dispatch = jest.fn();

  const headCellDispatch = headCellDispatchWrapper(setWidth, dispatch);
  expect(setWidth.mock.calls.length).toBe(0);
  expect(dispatch.mock.calls.length).toBe(0);

  headCellDispatch({ type: HeadCellResizeStateAction });
  expect(setWidth.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls.length).toBe(0);

  headCellDispatch({ type: 'smth' });
  expect(setWidth.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls.length).toBe(1);
});

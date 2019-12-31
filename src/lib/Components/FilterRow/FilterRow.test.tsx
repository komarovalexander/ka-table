
import React from 'react';
import ReactDOM from 'react-dom';

import FilterRow, { IFilterRowProps } from './FilterRow';

let props: IFilterRowProps;

beforeEach(() => {
  props = {
    columns: [],
    dispatch: jest.fn(),
    groupColumnsCount: 0,
  };
});

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<FilterRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

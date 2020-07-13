import React from 'react';
import ReactDOM from 'react-dom';

import NewRow, { INewRowProps } from './NewRow';

const props: INewRowProps = {
  childComponents: {},
  columns: [],
  groupColumnsCount: 0,
  dispatch: () => {},
  editableCells: [],
  rowKeyField: ''
};

it('renders without crashing', () => {
  const div = document.createElement('tbody');
  ReactDOM.render(<NewRow {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

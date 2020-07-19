import React from 'react';
import ReactDOM from 'react-dom';

import NoDataRow, { INoDataRow } from './NoDataRow';

const props: INoDataRow = {
  childComponents: {},
  columns: [],
  groupColumnsCount: 0,
};

it('renders without crashing', () => {
  const div = document.createElement('tbody');
  ReactDOM.render(<NoDataRow {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

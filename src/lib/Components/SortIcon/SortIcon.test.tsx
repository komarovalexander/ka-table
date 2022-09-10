import React from 'react';
import ReactDOM from 'react-dom';

import { ISortIconProps } from '../../props';
import SortIcon from './SortIcon';

const props: ISortIconProps = {
  childComponents: {},
  column: { key: 'column', title: 'Column 1'},
  dispatch: () => {}
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SortIcon {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

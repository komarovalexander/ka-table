import React from 'react';
import ReactDOM from 'react-dom';

import { Column } from '../../Models/Column';
import HeaderCell, { IHeadCellProps } from './HeadCell';

const props: IHeadCellProps = {
  column: new Column(),
  childComponents: {},
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<HeaderCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

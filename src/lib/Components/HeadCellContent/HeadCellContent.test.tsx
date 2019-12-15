import React from 'react';
import ReactDOM from 'react-dom';

import { Column } from '../../Models/Column';
import { IHeadCellProps } from '../HeadCell/HeadCell';
import HeadCellContent from './HeadCellContent';

const props: IHeadCellProps = {
  column: new Column(),
};

it('renders without crashing', () => {
  const element = document.createElement('th');
  ReactDOM.render(<HeadCellContent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

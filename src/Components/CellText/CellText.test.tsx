import React from 'react';
import ReactDOM from 'react-dom';

import CellText, { ICellTextProps } from './CellText';

const props: ICellTextProps = {
  changeToEditor: () => {},
  field: 'column',
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellText {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

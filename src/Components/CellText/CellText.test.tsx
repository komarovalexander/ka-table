import React from 'react';
import ReactDOM from 'react-dom';

import CellText, { ICellTextProps } from './CellText';

const props: ICellTextProps = {
  field: 'column',
  onChangeToEditor: () => {},
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellText {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import CellText from './CellText';

const props = {
  field: 'column',
  rowData: { column : 1 },
  rowEditableCells: [],
  rowKeyValue: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellText {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

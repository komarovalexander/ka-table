import React from 'react';
import ReactDOM from 'react-dom';

import CellEditor from './CellEditor';

const props = {
  field: 'column',
  rowData: { column : 1 },
  rowEditableCells: [],
  rowKeyValue: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellEditor {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import CellEditorState from './CellEditorState';

const props = {
  field: 'column',
  rowData: { column : 1 },
  rowEditableCells: [],
  rowKeyValue: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellEditorState {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

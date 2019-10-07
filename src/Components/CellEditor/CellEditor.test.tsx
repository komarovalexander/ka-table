import React from 'react';
import ReactDOM from 'react-dom';

import CellEditor, { ICellEditorProps } from './CellEditor';

const props: ICellEditorProps = {
  field: 'column',
  onChangeToText: () => {},
  onValueChange: () => {},
  rowData: [{ column: 1 }],
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditor {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

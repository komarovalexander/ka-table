import React from 'react';
import ReactDOM from 'react-dom';

import CellEditor, { ICellEditorProps } from './CellEditor';

const props: ICellEditorProps = {
  changeToText: () => {},
  field: 'column',
  rowData: [{ column: 1 }],
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellEditor {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

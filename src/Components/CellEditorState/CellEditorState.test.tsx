import React from 'react';
import ReactDOM from 'react-dom';

import CellEditorState, { ICellEditorStateProps } from './CellEditorState';

const props: ICellEditorStateProps = {
  changeToText: () => {},
  field: 'column',
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellEditorState {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

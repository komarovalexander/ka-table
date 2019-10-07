import React from 'react';
import ReactDOM from 'react-dom';

import CellEditorState, { ICellEditorStateProps } from './CellEditorState';

const props: ICellEditorStateProps = {
  field: 'column',
  onChangeToText: () => {},
  onRowDataChanged: () => {},
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorState {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

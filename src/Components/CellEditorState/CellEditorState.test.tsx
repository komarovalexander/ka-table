import React from 'react';
import ReactDOM from 'react-dom';

import CellEditorState, { ICellEditorStateProps } from './CellEditorState';

const props: ICellEditorStateProps = {
  column: {
    field: 'coumnField',
  },
  onChangeToText: () => {},
  onRowDataChanged: () => {},
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorState {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

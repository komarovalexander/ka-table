import React from 'react';
import ReactDOM from 'react-dom';

import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorString from './CellEditorString';

const props: ICellEditorProps = {
  column: {
    field: 'columnField',
    title: 'Field',
  },
  onChangeToText: () => {},
  onValueChange: () => {},
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorString {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
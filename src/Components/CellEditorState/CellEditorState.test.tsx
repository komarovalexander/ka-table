import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorState from './CellEditorState';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
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
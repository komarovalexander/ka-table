import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorString from './CellEditorString';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  isSelectedRow: true,
  onEvent: () => {},
  onValueChange: () => {},
  rowData: { column: 1 },
  rowKeyField: '',
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorString {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

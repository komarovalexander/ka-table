import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, EditingMode } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import NewRowCellEditor from './NewRowCellEditor';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'column',
    title: 'Field',
  },
  dispatch: () => {},
  editingMode: EditingMode.None,
  field: 'column',
  isSelectedRow: true,
  rowData: [{ column: 12, id: 1 }],
  rowKeyField: 'id',
  rowKeyValue: 1,
  value: 12,
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<NewRowCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

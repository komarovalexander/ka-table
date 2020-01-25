import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from './CellEditorDataType';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: () => {},
  field: 'columnField',
  isSelectedRow: true,
  rowData: {
    column: 1,
  },
  rowKeyField: '',
  value: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorDataType {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

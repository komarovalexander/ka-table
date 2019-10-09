import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDate from './CellEditorDate';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  onChangeToText: () => {},
  onValueChange: () => {},
  rowData: { columnField : new Date() },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorDate {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
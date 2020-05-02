import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import CellEditor, { ICellEditorProps } from './CellEditor';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: () => {},
  isSelectedRow: true,
  rowData: [{ column: 1 }],
  rowKeyField: '',
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditor {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

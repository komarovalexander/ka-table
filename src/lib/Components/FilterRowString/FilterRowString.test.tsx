import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import FilterRowString from './FilterRowString';

const props: ICellEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: () => {},
  isSelectedRow: true,
  onValueChange: () => {},
  rowData: { column: 1 },
  rowKeyField: '',
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<FilterRowString {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

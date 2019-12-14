import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import CellComponent, { ICellComponentProps } from './CellComponent';

const props: any = {
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  editableCells: [],
  isEditableCell: false,
  onOptionChange: () => {},
  onRowDataChanged: () => {},
  rowData: {
    column: 1,
  },
  rowKey: '1',
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellComponent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

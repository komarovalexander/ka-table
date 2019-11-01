import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import CellEditorValidation, { ICellEditorValidationProps } from './CellEditorValidation';

const props: ICellEditorValidationProps = {
  close: () => {},
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  onValueChange: () => {},
  rowData: [{ column: 1 }],
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellEditorValidation {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

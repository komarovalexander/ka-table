import React from 'react';
import ReactDOM from 'react-dom';

import CellComponent, { ICellProps } from './CellComponent';

const props: ICellProps = {
  editableCells: [],
  field: 'column',
  isEditableCell: false,
  onOptionChanged: () => {},
  rowData: {
    column: 1,
  },
  rowKeyValue: 1,
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<CellComponent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

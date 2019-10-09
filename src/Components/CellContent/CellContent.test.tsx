import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import CellContent, { ICellContentProps } from './CellContent';

const props: ICellContentProps = {
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  openEditor: () => {},
  rowData: { column : 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<CellContent {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { ICellContentProps } from '../CellContent/CellContent';
import CellText from './CellText';

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
  ReactDOM.render(<CellText {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

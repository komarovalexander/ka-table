import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../Enums/DataType';
import FilterCell, { IFilterCellProps } from './FilterCell';

const props: IFilterCellProps = {
  close: () => {},
  column: {
    dataType: DataType.String,
    field: 'columnField',
    title: 'Field',
  },
  onValueChange: () => {},
  rowData: {
    column: 1,
  },
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<FilterCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import FilterRowNumber from './FilterRowNumber';

const props: any = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: () => {},
  rowData: { column: 1 },
};

it('renders without crashing', () => {
  const element = document.createElement('td');
  ReactDOM.render(<FilterRowNumber {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

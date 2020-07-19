import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';
import FilterCell from './FilterCell';

const props: IFilterRowEditorProps = {
  childComponents: {},
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  }
};

it('renders without crashing', () => {
  const element = document.createElement('tr');
  ReactDOM.render(<FilterCell {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

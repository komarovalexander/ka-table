import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';
import FilterRowBoolean from '../FilterRowBoolean/FilterRowBoolean';

const props: IFilterRowEditorProps = {
  column: {
    dataType: DataType.String,
    key: 'fieldName',
    title: 'Field',
  },
  dispatch: jest.fn(),
  field: 'fieldName',
};

describe('FilterRowBoolean', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<FilterRowBoolean {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });
});

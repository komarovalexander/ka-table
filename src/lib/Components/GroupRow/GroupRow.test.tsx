import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import GroupRow, { IGroupRowProps } from './GroupRow';

const props: IGroupRowProps = {
  columns: [
    { field: 'column', title: 'Column 1', dataType: DataType.String },
    { field: 'column2', title: 'Column 2', dataType: DataType.String  },
  ],
  groupRowData: { key: ['group'], groupMark: {}, value: 123 },
  groupsExpanded: [],
  onOptionChanged: () => {},
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<GroupRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import GroupRow, { IGroupRowProps } from './GroupRow';

const props: IGroupRowProps = {
  columns: [
    { key: '1', field: 'column', title: 'Column 1', dataType: DataType.String },
    { key: '2', field: 'column2', title: 'Column 2', dataType: DataType.String  },
  ],
  emptyColumnsCount: 0,
  groupRowData: { key: ['group'], groupMark: {}, value: 123 },
  groups: [],
  groupsExpanded: [],
  onOptionChanged: () => {},
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<GroupRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

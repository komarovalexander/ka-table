import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const data = [
  { parentId: null, id: 1, name: 'Department A', productivity: 5 },
  { parentId: 1, id: 2, name: 'Mike Wazowski', productivity: 2 },
  { parentId: 1, id: 3, name: 'Billi Bob', productivity: 3 },
  { parentId: null, id: 4, name: 'Department B', productivity: 7 },
  { parentId: 4, id: 5, name: 'Tom Williams', productivity: 2 },
  { parentId: 4, id: 6, name: 'Kurt Cobain', productivity: 5 },
  { parentId: null, id: 7, name: 'Department C', productivity: 11 },
  { parentId: 10, id: 8, name: 'Sunny Fox', productivity: 2 },
  { parentId: 10, id: 9, name: 'Marshall Bruce', productivity: 5 },
  { parentId: 7, id: 10, name: 'Squad A', productivity: 7 },
  { parentId: 7, id: 11, name: 'Squad B', productivity: 4 },
  { parentId: 11, id: 12, name: 'Alex Thomson', productivity: 1 },
  { parentId: 11, id: 13, name: 'Mike Griffinson', productivity: 3 },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'productivity', title: 'Productivity', dataType: DataType.Number },
  ],
  data,
  parentRowKeyField: 'parentId',
  editingMode: EditingMode.Cell,
  parentsExpanded: [7, 11],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const TreeModeDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
};

export default TreeModeDemo;

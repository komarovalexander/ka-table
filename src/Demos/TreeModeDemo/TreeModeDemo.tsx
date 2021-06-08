import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray = [
  { parentId: null, id: 1, name: 'Microsoft', orderCount: 5 },
  { parentId: 1, id: 2, name: 'Xbox', orderCount: 2 },
  { parentId: 1, id: 3, name: 'HoloLens', orderCount: 3 },
  { parentId: null, id: 4, name: 'Apple', orderCount: 7 },
  { parentId: 4, id: 5, name: 'iPhone', orderCount: 2 },
  { parentId: 4, id: 6, name: 'MacBook', orderCount: 5 },

];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'orderCount', title: 'Count', dataType: DataType.Number },
  ],
  data: dataArray,
  parentRowKeyField: 'parentId',
  editingMode: EditingMode.Cell,
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

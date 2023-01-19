import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, FilteringMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const data = [
  { treeGroupId: null, id: 1, name: 'Department A', productivity: 5 },
  { treeGroupId: 1, id: 2, name: 'Mike Wazowski', productivity: 2 },
  { treeGroupId: 1, id: 3, name: 'Billi Bob', productivity: 3 },
  { treeGroupId: null, id: 4, name: 'Department B', productivity: 7 },
  { treeGroupId: 4, id: 5, name: 'Tom Williams', productivity: 2 },
  { treeGroupId: 4, id: 6, name: 'Kurt Cobain', productivity: 5 },
  { treeGroupId: null, id: 7, name: 'Department C', productivity: 11 },
  { treeGroupId: 10, id: 8, name: 'Sunny Fox', productivity: 2 },
  { treeGroupId: 10, id: 9, name: 'Marshall Bruce', productivity: 5 },
  { treeGroupId: 7, id: 10, name: 'Squad A', productivity: 7 },
  { treeGroupId: 7, id: 11, name: 'Squad B', productivity: 4 },
  { treeGroupId: 11, id: 12, name: 'Alex Thomson', productivity: 1 },
  { treeGroupId: 11, id: 13, name: 'Mike Griffinson', productivity: 3 },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'productivity', title: 'Productivity', dataType: DataType.Number },
  ],
  data,
  filteringMode: FilteringMode.FilterRow,
  treeGroupKeyField: 'treeGroupId',
  editingMode: EditingMode.Cell,
  treeGroupsExpanded: [7, 11],
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
      childComponents={{
        noDataRow: {
          content: () => 'No Data Found'
        }
      }}
    />
  );
};

export default TreeModeDemo;

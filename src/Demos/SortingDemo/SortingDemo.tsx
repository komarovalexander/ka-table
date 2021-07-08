import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, SortDirection, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];


const tablePropsInit: ITableProps = {
  columns: [
    {
      dataType: DataType.Boolean,
      key: 'passed',
      style: {width: 90},
      title: 'Passed',
    },
    {
      dataType: DataType.String,
      key: 'name',
      style: {width: 100},
      title: 'Name',
    },
    {
      dataType: DataType.Number,
      key: 'score',
      sortDirection: SortDirection.Ascend,
      style: {width: 120},
      title: 'Score',
    }
  ],
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const SortingDemo: React.FC = () => {
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

export default SortingDemo;

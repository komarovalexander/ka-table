import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 155, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tablePropsInit: ITableProps = {
  columns: [
    {
      dataType: DataType.String,
      key: 'name',
      width: '45%',
      title: 'Name'
    },
    {
      dataType: DataType.Number,
      key: 'score',
      width: 110,
      title: 'Score'
    },
    {
      dataType: DataType.Boolean,
      key: 'passed',
      title: 'Passed',
    },
  ],
  validation: ({ column, value }) => {
    if (column.key === 'name'){
      if (!value) {
        return `Value can't be empty`;
      }
    }
    if (column.key === 'score'){
      if (value > 100) {
        return `Value can't be more than 100`;
      }
      if (!value) {
        return `Value can't be empty`;
      }
    }
  },
  data: dataArray,
  editableCells: [{
    columnKey: 'score',
    rowKeyValue: 2,
  }],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const ValidationDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </>
  );
};

export default ValidationDemo;

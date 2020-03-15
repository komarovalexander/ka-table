import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 155, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.String,
      key: 'name',
      style: { width: '40%' },
      title: 'Name',
      validation: (value: any, rowData: any) => {
        if (!value) {
          return `Value can't be empty`;
        }
      },
    },
    {
      dataType: DataType.Number,
      key: 'score',
      style: { width: '70px' },
      title: 'Score',
      validation: (value: any, rowData: any) => {
        if (value > 100) {
          return `Value can't be more than 100`;
        }
        if (!value) {
          return `Value can't be empty`;
        }
      },
    },
    {
      dataType: DataType.Boolean,
      key: 'passed',
      title: 'Passed',
    },
  ],
  data: dataArray,
  editableCells: [{
    columnKey: 'score',
    rowKeyValue: 2,
  }],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const ValidationDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...option}
        dispatch={dispatch}
      />
    </>
  );
};

export default ValidationDemo;

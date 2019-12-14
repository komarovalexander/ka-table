import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode } from 'ka-table/enums';
import { OptionChangeFunc } from 'ka-table/types';

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
      style: { width: '10%' },
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
  editableCells: [{
    columnKey: 'score',
    rowKey: 2,
  }],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const ValidationDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({ ...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChange: OptionChangeFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <>
      <Table
        {...option}
        data={data}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
      />
    </>
  );
};

export default ValidationDemo;

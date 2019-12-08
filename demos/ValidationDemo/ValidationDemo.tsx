import React, { useState } from 'react';

import { ITableOption, Table } from 'react-table-component';
import { DataType, EditingMode } from 'react-table-component/enums';
import { OptionChangedFunc } from 'react-table-component/types';

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
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({ ...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <>
      <Table
        {...option}
        data={data}
        onOptionChanged={onOptionChanged}
        onDataChanged={onDataChanged}
      />
    </>
  );
};

export default ValidationDemo;

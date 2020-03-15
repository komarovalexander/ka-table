import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9, 10) },
];

const tableOption: ITableOption = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String, style: { width: '30%' } },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '40px' } },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean, style: { width: '10%' }},
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  data: dataArray,
  editableCells: [{
    columnKey: 'name',
    rowKeyValue: 2,
  }],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const EditingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...option}
      dispatch={dispatch}
    />
  );
};

export default EditingDemo;

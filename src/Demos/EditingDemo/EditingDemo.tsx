import React, { useState } from 'react';

import Table, { ITableOption } from '../../Components/Table/Table';
import { DataType } from '../../Enums/DataType';
import { EditingMode } from '../../Enums/EditingMode';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];

const tableOption: ITableOption = {
  columns: [
    { field: 'name', title: 'Name', dataType: DataType.String },
    { field: 'score', title: 'Score', dataType: DataType.Number },
    { field: 'passed', title: 'Passed', dataType: DataType.Boolean },
    { field: 'nextTry', title: 'Next Try', dataType: DataType.Date },
  ],
  editingMode: EditingMode.Cell,
  rowKey: 'id',
};

const EditingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChanged: OptionChangedFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChanged: OptionChangedFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChanged={onOptionChanged}
      onDataChanged={onDataChanged}
    />
  );
};

export default EditingDemo;
import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode } from '../../lib/enums';
import { OptionChangedFunc } from '../../lib/types';

const dataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const tableOption: ITableOption = {
  columns: [
    { field: 'type', title: 'TYPE', dataType: DataType.String },
    { field: 'name', title: 'NAME', dataType: DataType.String },
    { field: 'country', title: 'COUNTRY', dataType: DataType.String },
    { field: 'age', title: 'AGE', dataType: DataType.Number },
  ],
  editingMode: EditingMode.Cell,
  groups: [{ field: 'country' }, { field: 'type' }],
  rowKey: 'id',
};

const GroupingDemo: React.FC = () => {
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

export default GroupingDemo;

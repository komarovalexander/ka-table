import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode } from '../../lib/enums';
import { DataChangeFunc, OptionChangeFunc } from '../../lib/types';

const dataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const tableOption: ITableOption = {
  columns: [
    { key: 'type', title: 'TYPE', dataType: DataType.String },
    { key: 'name', title: 'NAME', dataType: DataType.String },
    { key: 'country', title: 'COUNTRY', dataType: DataType.String },
    { key: 'age', title: 'AGE', dataType: DataType.Number, style: { width: '50%' } },
  ],
  editingMode: EditingMode.Cell,
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
};

const GroupingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  const [data, changeData] = useState(dataArray);
  const onDataChange: DataChangeFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChange={onOptionChange}
      onDataChange={onDataChange}
    />
  );
};

export default GroupingDemo;

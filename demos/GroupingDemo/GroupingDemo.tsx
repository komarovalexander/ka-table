import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode } from 'ka-table/enums';
import { OptionChangedFunc } from 'ka-table/types';

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

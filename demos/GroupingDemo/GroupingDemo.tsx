import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'type', title: 'TYPE', dataType: DataType.String },
    { key: 'name', title: 'NAME', dataType: DataType.String },
    { key: 'country', title: 'COUNTRY', dataType: DataType.String },
    { key: 'age', title: 'AGE', dataType: DataType.Number, width: '50%' },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
};

const GroupingDemo: React.FC = () => {
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

export default GroupingDemo;

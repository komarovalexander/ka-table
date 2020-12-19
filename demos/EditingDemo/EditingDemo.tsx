import React from 'react';

import { Table } from 'ka-table';
import { DataType, EditingMode } from 'ka-table/enums';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9, 10) },
];

const EditingDemo: React.FC = () => (
  <Table
    columns={[
      { key: 'name', title: 'Name', dataType: DataType.String, style: { width: '30%' } },
      { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '40px' } },
      { key: 'passed', title: 'Passed', dataType: DataType.Boolean, style: { width: '10%' }},
      { key: 'nextTry', title: 'Next Try', dataType: DataType.Date },
    ]}
    format={({ column, value }) => {
      if (column.dataType === DataType.Date){
        return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
      }
    }}
    editableCells={[{
      columnKey: 'name',
      rowKeyValue: 2,
    }]}
    editingMode={EditingMode.Cell}
    data={dataArray}
    rowKeyField='id'
  />
);

export default EditingDemo;

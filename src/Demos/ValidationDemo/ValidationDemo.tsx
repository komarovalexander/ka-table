import React from 'react';

import { Table } from '../../lib';
import { DataType, EditingMode } from '../../lib/enums';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 155, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const ValidationDemo: React.FC = () => (
  <Table
    columns={[
      { dataType: DataType.String, key: 'name', style: { width: '40%' }, title: 'Name' },
      { dataType: DataType.Number, key: 'score', style: { width: '70px' }, title: 'Score' },
      { dataType: DataType.Boolean, key: 'passed', title: 'Passed' },
    ]}
    validation={({ column, value }) => {
      if (column.key === 'name'){
        if (!value) {
          return `Value can't be empty`;
        }
      }
      if (column.key === 'score'){
        if (value > 100) {
          return `Value can't be more than 100`;
        }
        if (!value) {
          return `Value can't be empty`;
        }
      }
    }}
    editableCells={[{
      columnKey: 'score',
      rowKeyValue: 2,
    }]}
    editingMode={EditingMode.Cell}
    data={dataArray}
    rowKeyField='id'
  />
);

export default ValidationDemo;

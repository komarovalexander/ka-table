import React from 'react';

import { Table } from '../../lib';
import { DataType } from '../../lib/enums';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, tryDate: new Date(2021, 10, 9) },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, tryDate: new Date(2021, 10, 8) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, tryDate: new Date(2019, 11, 8) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, tryDate: new Date(2021, 12, 9) },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, tryDate: new Date(2019, 11, 12) },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, tryDate: new Date(2020, 10, 9) },
  { id: 7, name: 'Dick Lee', score: 13, passed: false, tryDate: new Date(2017, 10, 9) },
  { id: 8, name: 'Papa Ricko', score: 73, passed: true, tryDate: new Date(2026, 10, 9) },
  { id: 9, name: 'Treme Watson', score: 61, passed: true, tryDate: new Date(2022, 10, 9) },
];

const CustomAttributesDemo: React.FC = () => (
  <Table
    columns={[
      { key: 'name', title: 'Name', dataType: DataType.String },
      { key: 'score', title: 'Score', dataType: DataType.Number, filterRowOperator: '>' },
      { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
      { dataType: DataType.Date, key: 'tryDate', title: 'Date', filterRowOperator: '<' },
    ]}
    data={dataArray}
    rowKeyField='id'
    format={({ column, value }) => {
      if (column.dataType === DataType.Date){
        return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
      }
    }}
    childComponents={{
      dataRow: {
        elementAttributes: ({ rowData }) => ({
          style: {
            backgroundColor: rowData.passed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'
          },
          title: `${rowData.name}: ${rowData.score}`
        })
      }
    }}
  />
);

export default CustomAttributesDemo;

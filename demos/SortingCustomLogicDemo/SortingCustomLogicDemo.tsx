import { DataType, Table } from 'ka-table';
import { SortDirection, SortingMode } from 'ka-table/enums';

import React from 'react';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, prevScores: [59, 65, 70], passed: true },
  { id: 2, name: 'Billi Bob', score: 55, prevScores: [60, 43, 50], passed: false },
  { id: 3, name: 'Tom Williams', score: 45, prevScores: [62, 61, 60], passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, prevScores: [63, 60, 71], passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, prevScores: [72, 80, 79], passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, prevScores: [25, 45, 37], passed: false },
  { id: 7, name: 'Alex Brzowsky', score: 48, prevScores: [50, 47, 43], passed: false },
];

const SortingCustomLogicDemo: React.FC = () => {
  return (
    <Table
      columns= {[
        {
          dataType: DataType.Boolean,
          key: 'passed',
          style: {width: 90},
          title: 'Passed',
        },
        {
          dataType: DataType.String,
          key: 'name',
          style: {width: 100},
          title: 'Name',
        },
        {
          dataType: DataType.Number,
          key: 'score',
          style: {width: 120},
          title: 'Score',
        },
        {
          dataType: DataType.Object,
          sortDirection: SortDirection.Ascend,
          key: 'prevScores',
          style: {width: 120},
          title: 'Previous Scores',
        }
      ]}
      data={dataArray}
      format= {({ column, value }) => {
        if (column.key === 'prevScores'){
          return value.join();
        }
      }}
      sort={({ column }) => {
        if (column.key === 'prevScores'){
          return (a, b) => a[0] === b[0]
            ? 0
            : a[0] < b[0]
              ? column.sortDirection === SortDirection.Ascend ? -1 : 1
              : column.sortDirection === SortDirection.Ascend ? 1 : -1;
        }
      }}
      rowKeyField={'id'}
      sortingMode={SortingMode.Single}
    />
  );
};

export default SortingCustomLogicDemo;

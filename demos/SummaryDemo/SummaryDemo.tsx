import React from 'react';

import { DataType, Table } from 'ka-table';
import { SortingMode } from 'ka-table/enums';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const SummaryDemo: React.FC = () => {
  return (
    <Table
      columns= {[
        { key: 'name', title: 'Name', dataType: DataType.String, width: '45%' },
        { key: 'score', title: 'Score', dataType: DataType.Number, width: '15%', style: { textAlign: 'right' } },
        { dataType: DataType.Boolean, key: 'passed', title: 'Passed', style: {textAlign: 'right' } },
      ]}
      data={dataArray}
      sortingMode={SortingMode.Single}
      rowKeyField={'id'}
      childComponents={{
        summaryCell: {
          content: ({ column, data }) => {
            switch (column.key){
              case 'score': return (
                <>
                  <b>Max: {Math.max.apply(Math, data.map((o) => o.score))}</b>
                  <br />
                  <b>Min: {Math.min.apply(Math, data.map((o) => o.score))}</b>
                </>
              );
              case 'passed': return (
                <>
                  <b>Passed total: {data.filter((o) => o.passed).length}</b>
                </>
              );
            }
          }
        }
      }}
    />
  );
};

export default SummaryDemo;

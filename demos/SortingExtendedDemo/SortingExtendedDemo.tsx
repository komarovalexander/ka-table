import { DataType, Table } from 'ka-table';
import { SortDirection, SortingMode } from 'ka-table/enums';

import React from 'react';
import orderBy from 'lodash.orderby';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, faculty: 'Economics', comment: 'Well done!' },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, faculty: 'Engineering', comment: 'almost did it, keep going' },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, faculty: 'Engineering', comment: 'you can do it better' },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, faculty: 'Economics', comment: 'Well done!' },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, faculty: 'Mathematics', comment: 'Well done!' },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, faculty: 'Mathematics', comment: 'It was just a bad day :)' },
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
          sortDirection: SortDirection.Ascend,
          style: {width: 120},
          title: 'Score',
        },
        {
          dataType: DataType.String,
          key: 'faculty',
          style: {width: 150},
          title: 'Faculty (Custom icon)',
        },
        {
          dataType: DataType.String,
          key: 'comment',
          style: {width: 150},
          isSortable: false,
          title: 'Comment (sorting disabled)',
        }
      ]}
      data={dataArray}
      format= {({ column, value }) => {
        if (column.key === 'prevScores'){
          return value.join();
        }
      }}
      extendedSort={(data, columns) => {
        let sortedColumns = columns.filter(c => c.sortDirection);
        if (sortedColumns.length === 0){
          return data;
        }
        sortedColumns = orderBy(sortedColumns, ['sortIndex'], ['asc']);
        const iteratee = sortedColumns.map(c => c.key);
        const order = sortedColumns.map(c => c.sortDirection === SortDirection.Ascend ? 'asc' : 'desc');
        return orderBy(data, iteratee, order);
      }}
      rowKeyField={'id'}
      sortingMode={SortingMode.MultipleTripleStateRemote}
    />
  );
};

export default SortingCustomLogicDemo;

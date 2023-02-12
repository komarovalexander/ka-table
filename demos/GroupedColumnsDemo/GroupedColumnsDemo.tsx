import './GroupedColumnsDemo.scss';

import React from 'react';

import { DataType, Table } from 'ka-table';
import { SortingMode } from 'ka-table/enums';
import { Column } from 'ka-table/models';

const columns: Column[] = Array(15).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    width: 200,
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(30).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, column) => ({
    ...previousValue,
    [column.key]: `${column.key} row:${index}`
  }), { id: index }),
);

const GroupedColumnsDemo: React.FC = () => {
  return (
    <div className='group-header-column-demo'>
      <Table
        columnResizing={true}
        groupedColumns= {[{
          key: 'grouped.column1',
          title: 'Group 1',
          columnsKeys: ['grouped.column2', 'grouped.column3']
        }, {
          key: 'grouped.column2',
          title: 'Subgroup 1',
          columnsKeys: ['column1', 'column2']
        }, {
          key: 'grouped.column3',
          title: 'Subgroup 2',
          columnsKeys: ['column3', 'column4', 'column5']
        }, {
          key: 'grouped.column4',
          title: 'Group 2',
          columnsKeys: ['column7', 'column8']
        }, {
          key: 'grouped.column5',
          title: 'Group 3',
          columnsKeys: ['column9', 'column10', 'column14']
        }]}
        columns={columns}
        data={dataArray}
        rowKeyField={'id'}
        sortingMode={SortingMode.Single}
      />
    </div>
  );
};

export default GroupedColumnsDemo;

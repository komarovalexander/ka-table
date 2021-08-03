import './GroupedHeaderColumnsDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, SortingMode } from '../../lib/enums';
import { Column } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(15).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    width: 200,
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(30).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, currentValue) => {
    previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
    return previousValue;
  }, { id: index }),
);

const tablePropsInit: ITableProps = {
  columnResizing: true,
  // columnReordering: true,
  groupedColumns: [ {
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
  }],
  columns,
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single
};

const GroupedHeaderColumnsDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='group-header-column-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default GroupedHeaderColumnsDemo;

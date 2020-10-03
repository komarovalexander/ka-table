import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { Column } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(15).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    style: { width: 150 },
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
  groupedColumns: [{
    key: 'grouped.column1-2',
    title: 'Name',
    columnsKeys: ['column1', 'column2']
  }, {
    key: 'grouped.column3-5',
    title: 'Name 2',
    columnsKeys: ['column3', 'column4', 'column5']
  }, {
    key: 'grouped.column7-8',
    title: 'Name 3',
    columnsKeys: ['column7', 'column8']
  }, {
    key: 'grouped.column9-10',
    title: 'Name 4',
    columnsKeys: ['column9', 'column10', 'column14']
  }, {
    key: 'grouped.column-7-10',
    title: 'Name 5',
    columnsKeys: ['grouped.column7-8', 'grouped.column9-10']
  }],
  columns,
  data: dataArray,
  rowKeyField: 'id'
};

const MultiColumnHeaderDemo: React.FC = () => {
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

export default MultiColumnHeaderDemo;

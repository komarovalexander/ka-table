import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import defaultOptions from '../../lib/defaultOptions';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

defaultOptions.fieldDelimiter = '';
const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    'column.1': `column:1 row:${index}`,
    'column.2': `column:2 row:${index}`,
    'column.3': `column:3 row:${index}`,
    'column.4': `column:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column.1', title: 'Column 1', dataType: DataType.String },
    { key: 'column.2', title: 'Column 2', dataType: DataType.String },
    { key: 'column.3', title: 'Column 3', dataType: DataType.String },
    { key: 'column.4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OverviewDemo: React.FC = () => {
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

export default OverviewDemo;

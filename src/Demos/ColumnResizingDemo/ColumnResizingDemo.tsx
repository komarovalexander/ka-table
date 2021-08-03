import './ColumnResizingDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { Column } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const columns: Column[] = Array(15).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    col: { style: { minWidth: 100 }},
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
  sortingMode: SortingMode.Single,
  rowKeyField: 'id',
  editingMode: EditingMode.Cell,
  data: dataArray,
  columns,
  columnResizing: true,
};

const ColumnResizingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='column-resizing-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ColumnResizingDemo;

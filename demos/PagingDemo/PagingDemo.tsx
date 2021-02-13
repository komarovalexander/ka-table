import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, PagingPosition, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(180).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'id', title: 'Id', dataType: DataType.Number, isEditable: false },
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15]
  },
  sortingMode: SortingMode.Single,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const PagingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <>
      Paging position: <select
        value={tableProps.paging?.position}
        onChange={(e) => changeTableProps({ ...tableProps, paging: { ...tableProps.paging, position: e.target.value as any }})}
        style={{marginBottom: 20}}>
        <option value={PagingPosition.Bottom}>Bottom</option>
        <option value={PagingPosition.Top}>Top</option>
        <option value={PagingPosition.TopAndBottom}>TopAndBottom</option>
      </select>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </>
  );
};

export default PagingDemo;

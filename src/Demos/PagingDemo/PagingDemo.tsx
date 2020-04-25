import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(80).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  // groups: [{ columnKey: 'column1' }],
  paging: {
    enabled: true,
    pageIndex: 2,
    pageSize: 4,
  },
  rowKeyField: 'id',
};

const PagingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...option}
        dispatch={dispatch}
      />
    </>
  );
};

export default PagingDemo;

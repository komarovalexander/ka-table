import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(100000).fill(undefined).map(
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
    { key: 'column1', title: 'Column 1' },
    { key: 'column2', title: 'Column 2' },
    { key: 'column3', title: 'Column 3' },
    { key: 'column4', title: 'Column 4' },
  ],
  data: dataArray,
  rowKeyField: 'id',
  virtualScrolling: {
    enabled: true
  },
};

const ManyRowsDemo: React.FC = () => {
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

export default ManyRowsDemo;

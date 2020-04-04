import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DispatchFunc, HeaderCellFuncPropsWithChildren } from '../../lib/types';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    id: index,
  }),
);

const HeadCell: React.FC<HeaderCellFuncPropsWithChildren> = ({
  column: { title },
}) => {
  return (
    <div style={{color: 'red'}}>
      {title} - (Custom)
    </div>
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      headCell: (props) => <HeadCell {...props}/>,
      key: 'column1',
      style: { textAlign: 'left' },
      title: 'Column 1',
    },
    {
      key: 'column2',
      title: 'Column 2',
    },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const CustomHeaderCellDemo: React.FC = () => {
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

export default CustomHeaderCellDemo;

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { kaReducer } from '../../lib/reducers';
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

const tableOption: ITableOption = {
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
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...option}
      dispatch={dispatch}
    />
  );
};

export default CustomHeaderCellDemo;

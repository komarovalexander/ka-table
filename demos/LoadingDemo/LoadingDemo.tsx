import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { hideLoading, showLoading } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
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
  loading: {
    enabled: true,
    text: 'Loading data'
  },
  rowKeyField: 'id',
};

const LoadingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <>
      <button onClick={(e) => dispatch(option.loading?.enabled ? hideLoading() : showLoading())} className='top-element'>
        {option.loading?.enabled ? 'Hide Loading' :  'Show Loading'}
      </button>
      <Table
        {...option}
        dispatch={dispatch}
      />
    </>
  );
};

export default LoadingDemo;

import './CustomPagingDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { updatePageIndex, updatePageSize } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { IPagingPagesProps, IPagingProps } from 'ka-table/props';
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

const tableOption: ITableProps = {
  columns: [
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
  rowKeyField: 'id',
};

const PageSizeSelector: React.FC<IPagingProps> = ({ pageSize, pageSizes, dispatch }) =>  (
  <select
    className='form-control'
    defaultValue={pageSize}
    onChange={(event) => {
      dispatch(updatePageSize(Number(event.currentTarget.value)));
    }}>
    {
      pageSizes?.map((value) => (<option key={value} value={value}>{value}</option>))
    }
  </select>
)

const PagesSelector: React.FC<IPagingPagesProps> = ({ pageIndex, pageSize, dispatch }) =>  (
  <select
    className='form-control'
    defaultValue={pageIndex}
    onChange={(event) => {
      dispatch(updatePageIndex(Number(event.currentTarget.value)));
    }}>
    {
      [...Array(pageSize)].map((_, index) => (<option key={index} value={index}>{index + 1}</option>))
    }
  </select>
)

const CustomPagingDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='custom-paging-demo'>
      <Table
        {...option}
        dispatch={dispatch}
        childComponents={{
          pagingSizes: {
            content: (props) => <>Page Size: <PageSizeSelector {...props}/></>
          },
          pagingPages: {
            content: (props) => <>Page Number: <PagesSelector {...props}/></>
          }
        }}
      />
    </div>
  );
};

export default CustomPagingDemo;

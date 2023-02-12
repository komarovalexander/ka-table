import './CustomPagingDemo.scss';

import React from 'react';

import { DataType, Table } from '../../lib';
import { updatePageIndex, updatePageSize } from '../../lib/actionCreators';
import { IPagingProps } from '../../lib/props';

const dataArray = Array(180).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const PageSizeSelector: React.FC<IPagingProps> = ({ pageSize, pageSizes, dispatch }) =>  (
  <>
    Page Size:
    <select
      className='form-control'
      value={pageSize}
      onChange={(event) => {
        dispatch(updatePageSize(Number(event.currentTarget.value)));
      }}>
      {
        pageSizes?.map((value) => (<option key={value} value={value}>{value}</option>))
      }
    </select>
  </>
)

const PagesSelector: React.FC<IPagingProps> = ({ pageIndex, pagesCount, dispatch }) =>  (
  <>
    Page Number:
    <select
      className='form-control'
      value={pageIndex}
      onChange={(event) => {
        dispatch(updatePageIndex(Number(event.currentTarget.value)));
      }}>
      {
        [...Array(pagesCount)].map((_, index) => (<option key={index} value={index}>{index + 1}</option>))
      }
    </select>
  </>
)

const CustomPagingDemo: React.FC = () => {
  return (
    <div className='custom-paging-demo'>
      <Table
        columns= {[
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
        ]}
        data={dataArray}
        paging= {{
          enabled: true,
          pageIndex: 0,
          pageSize: 10,
          pageSizes: [5, 10, 15]
        }}
        rowKeyField={'id'}
        childComponents={{
          pagingSizes: {
            content: (props) => <PageSizeSelector {...props}/>
          },
          pagingPages: {
            content: (props) => <PagesSelector {...props}/>
          }
        }}
      />
    </div>
  );
};

export default CustomPagingDemo;

import { Table, useTable } from '../../lib';

import { DataType } from '../../lib/enums';
import React from 'react';

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }));

const LoadingDemo: React.FC = () => {
  const table = useTable();

  return (
    <>
      <button
        onClick={(e) => {
          table.props.loading?.enabled ? table.hideLoading() : table.showLoading();
        }}
        className='top-element'
      >
        {table.props.loading?.enabled ? 'Hide Loading' : 'Show Loading'}
      </button>
      <Table
        table={table}
        columns={[
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
        ]}
        data={dataArray}
        loading={{
          enabled: true,
          text: 'Loading data',
        }}
        rowKeyField='id'
      />
    </>
  );
};

export default LoadingDemo;

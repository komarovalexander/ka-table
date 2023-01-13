import './EditingTableDemo.scss';

import React from 'react';

import { DataType, Table, useTable } from 'ka-table';
import { openAllEditors } from 'ka-table/actionCreators';
import { kaPropsUtils } from 'ka-table/utils';

const dataArray = Array(3)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index
  }));

const AddRowDemo = () => {
  const table = useTable();
  const updateCells = () => {
    if (kaPropsUtils.isValid(table.props)) {
      table.saveAllEditors();
    } else {
      table.validate();
    }
  };

  return (
    <div className='editing-table-demo'>
      <button onClick={updateCells}>update</button>
      <button onClick={() => table.validate()}>Validate</button>
      <Table
        table={table}
        columns= {[
          {
            key: 'column1',
            title: 'Column 1',
            dataType: DataType.String
          },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'value', title: 'Value', dataType: DataType.String }
        ]}
        data={dataArray}
        validation={({ column, value }) => {
          if (column.key === 'value') {
            return value ? '' : 'value must be specified';
          }
        }}
        rowKeyField={'id'}
        singleAction={openAllEditors()}
      />
      <div className='table-data'>
        <h4>Table Data:</h4>
        <pre className='data'>{JSON.stringify(table.props.data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AddRowDemo;

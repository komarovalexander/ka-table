import './EditingTableDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { openAllEditors, saveAllEditors, validate } from '../../lib/actionCreators';
import { DataType } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { kaPropsUtils } from '../../lib/utils';

const dataArray = Array(3)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index
  }));

const tablePropsInit: ITableProps = {
  columns: [
    {
      key: 'column1',
      title: 'Column 1',
      dataType: DataType.String
    },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'value', title: 'Value', dataType: DataType.String }
  ],
  data: dataArray,
  validation: ({ column, value }) => {
    if (column.key === 'value') {
      return value ? '' : 'value must be specified';
    }
  },
  rowKeyField: 'id',
  singleAction: openAllEditors()
};

const AddRowDemo = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };

  const updateCells = () => {
    if (kaPropsUtils.isValid(tableProps)) {
      dispatch(saveAllEditors());
    } else {
      dispatch(validate());
    }
  };

  return (
    <div className='editing-table-demo'>
      <button onClick={updateCells}>update</button>
      <button onClick={() => dispatch(validate())}>Validate</button>
      <Table {...tableProps} dispatch={dispatch} />
      <div className='table-data'>
        <h4>Table Data:</h4>
        <pre className='data'>{JSON.stringify(tableProps.data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AddRowDemo;

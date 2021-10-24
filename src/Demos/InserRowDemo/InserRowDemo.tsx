import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { insertRow } from '../../lib/actionCreators';
import { DataType, EditingMode, InsertRowPosition } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 rowId:${index}`,
    column2: `column:2 rowId:${index}`,
    column3: `column:3 rowId:${index}`,
    id: index,
  }),
);

let maxValue = Math.max(...dataArray.map(i => i.id));
const generateNewId = () => {
  maxValue++;
  return maxValue;
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      key: 'column1',
      title: 'Column 1',
      dataType: DataType.String
    },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    {
      key: 'insertRowBeforeColumn',
      width: 200
    },
    {
      key: 'insertRowAfterColumn',
      width: 200
    },
  ],
  editingMode: EditingMode.Cell,
  data: dataArray,
  rowKeyField: 'id',
};

const InserRowDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='add-row-demo'>
      <Table
        {...tableProps}
        childComponents={{
          cell: {
            content: (props) => {
              if (props.column.key === 'insertRowBeforeColumn'){
                return (
                  <button onClick={() => {
                    const id = generateNewId();
                    const newRow = {
                      id,
                      column1: `column:1 rowId:${id}`,
                    };
                    dispatch(insertRow(newRow, { rowKeyValue: props.rowKeyValue }))
                  }}>
                    Insert Row Before
                  </button>
                );
              }
              if (props.column.key === 'insertRowAfterColumn'){
                return (
                  <button onClick={() => {
                    const id = generateNewId();
                    const newRow = {
                      id,
                      column1: `column:1 rowId:${id}`,
                    };
                    dispatch(insertRow(newRow, { rowKeyValue: props.rowKeyValue, insertRowPosition: InsertRowPosition.after }))
                  }}>
                    Insert Row After
                  </button>
                );
              }
            }
          },
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default InserRowDemo;

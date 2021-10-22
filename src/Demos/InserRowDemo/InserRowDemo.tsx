import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { insertRow } from '../../lib/actionCreators';
import { DataType, EditingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
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
      key: 'insertRowColumn',
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
              if (props.column.key === 'insertRowColumn'){
                return (
                  <button onClick={() => dispatch(insertRow({ id: generateNewId() }, { afterRowKeyValue: props.rowKeyValue }))}>
                    Insert Row Above
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

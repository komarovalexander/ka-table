import './AddRowDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { hideNewRow, saveNewRow, showNewRow } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { ICellEditorProps, IHeadCellProps } from 'ka-table/props';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

let maxValue = Math.max(...dataArray.map(i => i.id));
const generateNewId = () => {
  maxValue++;
  return maxValue;
};

const AddButton: React.FC<IHeadCellProps> = ({
  dispatch,
}) => {
 return (
  <div className='plus-cell-button'>
    <img
      src='static/icons/plus.svg'
      alt='Add New Row'
      title='Add New Row'
      onClick={() => dispatch(showNewRow())}
    />
  </div>
 );
};

const SaveButton: React.FC<ICellEditorProps> = ({
  dispatch
}) => {
  const saveNewData = () => {
    const rowKeyValue = generateNewId();
    dispatch(saveNewRow(rowKeyValue, {
      validate: true
    }));
  };
  return (
   <div className='buttons'>
    <img
      src='static/icons/save.svg'
      className='save-cell-button'
      alt='Save'
      title='Save'
      onClick={saveNewData}
    />
    <img
      src='static/icons/close.svg'
      className='close-cell-button'
      alt='Cancel'
      title='Cancel'
      onClick={() => dispatch(hideNewRow())}
    />
   </div>
 );
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
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    {
      key: 'addColumn',
      style: {width: 53}
    },
  ],
  data: dataArray,
  validation: ({ column, value }) => {
    if (column.key === 'column1'){
      return value ? '' : 'value must be specified';
    }
  },
  rowKeyField: 'id',
};

const AddRowDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='add-row-demo'>
      <Table
        {...tableProps}
        childComponents={{
          cellEditor: {
            content: (props) => {
              if (props.column.key === 'addColumn'){
                return <SaveButton {...props}/>;
              }
            }
          },
          headCell: {
            content: (props) => {
              if (props.column.key === 'addColumn'){
                return <AddButton {...props}/>;
              }
            }
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default AddRowDemo;

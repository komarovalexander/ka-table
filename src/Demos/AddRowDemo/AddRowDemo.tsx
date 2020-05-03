import './AddRowDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { hideNewRow, saveNewRow, showNewRow } from '../../lib/actionCreators';
import { DataType } from '../../lib/enums';
import {
  DispatchFunc, EditorFuncPropsWithChildren, HeaderCellFuncPropsWithChildren,
} from '../../lib/types';

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

const AddButton: React.FC<HeaderCellFuncPropsWithChildren> = ({
  dispatch,
}) => {
 return (
  <div className='plus-cell-button'>
    <img
      src='static/icons/plus.svg'
      alt=''
      onClick={() => dispatch(showNewRow())}
    />
  </div>
 );
};

const SaveButton: React.FC<EditorFuncPropsWithChildren> = ({
  dispatch
}) => {
  const saveNewData = () => {
    const newRowId = generateNewId();
    dispatch(saveNewRow(newRowId, {
      closeAfterSave: true,
      validate: true
    }));
  };
  return (
   <div className='buttons'>
    <img
      src='static/icons/save.svg'
      className='save-cell-button'
      alt=''
      onClick={saveNewData}
    />
    <img
      src='static/icons/close.svg'
      className='close-cell-button'
      alt=''
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
      dataType: DataType.String,
      validation: (value) => {
        return value ? '' : 'value must be specified';
      }
    },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    {
      key: 'addColumn',
      headCell: AddButton,
      style: {width: 53},
      editor: (props) => <SaveButton {...props}/>
    },
  ],
  data: dataArray,
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
        dispatch={dispatch}
      />
    </div>
  );
};

export default AddRowDemo;

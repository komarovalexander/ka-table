import './EditingRowDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { closeRowEditors, openRowEditors, saveRowEditors } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import {
  CellFuncPropsWithChildren, DispatchFunc, EditorFuncPropsWithChildren,
} from 'ka-table/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9, 10) },
];

const EditButton: React.FC<CellFuncPropsWithChildren> = ({
  dispatch, rowKeyValue
}) => {
  return (
   <div className='edit-cell-button'>
     <img
      src='static/icons/edit.svg'
      alt='Edit Row'
      title='Edit Row'
      onClick={() => dispatch(openRowEditors(rowKeyValue))}
    />
   </div>
  );
};

const SaveButton: React.FC<EditorFuncPropsWithChildren> = ({
  dispatch, rowKeyValue
}) => {
  return (
    <div className='buttons'
      style={{display: 'flex', justifyContent: 'space-between'}} >
      <img
        src='static/icons/save.svg'
        className='save-cell-button'
        alt='Save'
        title='Save'
        onClick={() => {
          dispatch(saveRowEditors(rowKeyValue, {
            validate: true,
          }));
        }}
      />
      <img
        src='static/icons/close.svg'
        className='close-cell-button'
        alt='Cancel'
        title='Cancel'
        onClick={() => {
          dispatch(closeRowEditors(rowKeyValue));
        }}
      />
   </div >
 );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      key: 'name',
      title: 'Name',
      dataType: DataType.String,
      validation: (value) => {
        return value ? '' : 'value must be specified';
      }
    },
    {key: 'score', title: 'Score', dataType: DataType.Number },
    {key: 'passed', title: 'Passed', dataType: DataType.Boolean},
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
    {
      key: 'editColumn',
      style: {width: 50},
      cell: (props) => <EditButton {...props}/>,
      editor: (props) => <SaveButton {...props}/>,
    },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const EditingDemoRow: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='editing-row-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default EditingDemoRow;

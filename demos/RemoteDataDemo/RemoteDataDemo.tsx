import './RemoteDataDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { deleteRow, updateData } from 'ka-table/actionCreators';
import { ActionType, DataType, EditingMode } from 'ka-table/enums';
import { CellFuncPropsWithChildren, DispatchFunc } from 'ka-table/types';
import { getField } from 'ka-table/Utils/ColumnUtils';
import serverEmulator from './serverEmulator';

const DeleteRow: React.FC<CellFuncPropsWithChildren> = ({
  dispatch, rowKeyValue,
}) => {
 return (
    <img
      src='static/icons/delete.svg'
      className='delete-row-column-button'
      onClick={() => dispatch(deleteRow(rowKeyValue))}
      alt=''
    />
 );
};

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: ':delete', cell: (props) => <DeleteRow {...props} />, style: { width: 40, textAlign: 'center' } },
  ],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const CHANGE_LOADING = 'CHANGE_LOADING';
const RemoteDataDemo: React.FC = () => {
  const [loadingText, changeLoading] = useState('Loading Data..');
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ActionType.DeleteRow) {
      dispatch({ type: CHANGE_LOADING, loading: 'Deleting Row..' });
      serverEmulator.delete(action.rowKeyValue).then((data) => {
        dispatch(updateData(data));
        dispatch({ type: CHANGE_LOADING, loading: '' });
      });
    } else if (action.type === ActionType.UpdateCellValue) {
      dispatch({ type: CHANGE_LOADING, loading: 'Changing Data..' });
      const column = tableProps.columns.find((c) => c.key === action.columnKey)!;
      changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
      serverEmulator.update(action.rowKeyValue, { [getField(column)]: action.value }).then((data) => {
        dispatch(updateData(data));
        dispatch({ type: CHANGE_LOADING, loading: '' });
      });
    } else if (action.type === CHANGE_LOADING) {
      changeLoading(action.loading);
    } else {
      changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    }
  };

  if (!tableProps.data) {
    serverEmulator.get().then(
      (data) => {
        dispatch(updateData(data));
        dispatch({ type: CHANGE_LOADING, loading: '' });
      },
    );
  }

  return (
    <div className='remote-data-demo'>
      {loadingText && <div className='remote-data-demo-loading'>{loadingText}</div>}
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default RemoteDataDemo;

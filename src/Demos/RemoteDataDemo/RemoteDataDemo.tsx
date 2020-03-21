import './RemoteDataDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { changeData, deleteRow } from '../../lib/actionCreators';
import { ActionType, DataType, EditingMode } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';
import { CellFuncPropsWithChildren, DispatchFunc } from '../../lib/types';
import { getField } from '../../lib/Utils/ColumnUtils';
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

const tableOption: ITableOption = {
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
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ActionType.DeleteRow) {
      dispatch({ type: CHANGE_LOADING, loading: 'Deleting Row..' });
      serverEmulator.delete(action.rowKeyValue).then((data) => {
        dispatch(changeData(data));
        dispatch({ type: CHANGE_LOADING, loading: '' });
      });
    } else if (action.type === ActionType.ChangeCellValue) {
      dispatch({ type: CHANGE_LOADING, loading: 'Changing Data..' });
      const column = option.columns.find((c) => c.key === action.columnKey)!;
      changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
      serverEmulator.update(action.rowKeyValue, { [getField(column)]: action.value }).then((data) => {
        dispatch(changeData(data));
        dispatch({ type: CHANGE_LOADING, loading: '' });
      });
    } else if (action.type === CHANGE_LOADING) {
      changeLoading(action.loading);
    } else {
      changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
    }
  };

  if (!option.data) {
    serverEmulator.get().then(
      (data) => {
        dispatch(changeData(data));
        dispatch({ type: CHANGE_LOADING, loading: '' });
      },
    );
  }

  return (
    <div className='remote-data-demo'>
      {loadingText && <div className='remote-data-demo-loading'>{loadingText}</div>}
      <Table
        {...option}
        dispatch={dispatch}
      />
    </div>
  );
};

export default RemoteDataDemo;

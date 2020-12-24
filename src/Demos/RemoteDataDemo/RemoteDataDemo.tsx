import React, { useEffect, useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { hideLoading, showLoading, updateData, updatePagesCount } from '../../lib/actionCreators';
import { ActionType, DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { DeleteRow } from './components';
import serverEmulator from './serverEmulator';

interface IRemoteTableProps extends ITableProps {
  loadActions: string[];
}

const tablePropsInit: IRemoteTableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: ':delete', style: { width: 40, textAlign: 'center' }},
  ],
  editingMode: EditingMode.Cell,
  loading: {
    enabled: true
  },
  loadActions: ['LOAD_DATA'],
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10
  },
  sortingMode: SortingMode.SingleRemote,
  rowKeyField: 'id',
};

const LOAD_DATA = 'LOAD_DATA';
const CLEAR_LOAD_ACTIONS = 'CLEAR_LOAD_ACTIONS';
const loadData = () => ({ type: LOAD_DATA });
const clearLoadActions = () => ({ type: CLEAR_LOAD_ACTIONS });

const remoteReducer = (props: ITableProps, action: any) => {
  switch (action.type) {
    case LOAD_DATA: {
      return {...props, loadActions: ['LOAD_DATA'] };
    }
    case CLEAR_LOAD_ACTIONS: {
      return {...props, loadActions: undefined };
    }
  }
  return kaReducer(props, action);
}

const combineDispatch = (baseDispath: DispatchFunc, remoteDispatch: DispatchFunc) => {
  const dispatch: DispatchFunc = (action) => {
    remoteDispatch(action);
    baseDispath(action);
  };
  return dispatch;
};

const RemoteDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const baseDispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => remoteReducer(prevState, action));
  };
  const remoteDispatch: DispatchFunc = async (action) => {
    if (action.type === ActionType.DeleteRow) {
      dispatch(showLoading());
      await serverEmulator.delete(action.rowKeyValue);
      dispatch(loadData());
    } else if (action.type === ActionType.UpdateCellValue) {
      dispatch(showLoading());
      await serverEmulator.update(action.rowKeyValue, { [action.columnKey]: action.value });
      dispatch(loadData());
    } else if (action.type === ActionType.UpdateSortDirection || action.type === ActionType.UpdatePageIndex) {
      dispatch(loadData());
    } else if (action.type === LOAD_DATA) {
      dispatch(showLoading());
      const result = await serverEmulator.get(tableProps.paging, tableProps.columns, action?.pageIndex);
      dispatch(updatePagesCount(result.pagesCount));
      dispatch(updateData(result.data));
      dispatch(hideLoading());
    }
  };
  const dispatch: DispatchFunc = combineDispatch(baseDispatch, remoteDispatch);

  useEffect(() => {
    if (tableProps.loadActions){
      dispatch(loadData());
      dispatch(clearLoadActions());
    }
  });

  return (
    <div className='remote-data-demo'>
      <Table
        {...tableProps}
        childComponents={{
          cell: {
            content: (props) => {
              if (props.column.key === ':delete'){
                return <DeleteRow {...props} />
              }
            }
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default RemoteDataDemo;

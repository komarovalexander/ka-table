import React, { useEffect, useState } from 'react';

import { ITableProps, Table } from 'ka-table';
import {
  deleteRow, hideLoading, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';
import { ActionType, DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { ICellTextProps } from 'ka-table/props';
import { DispatchFunc } from 'ka-table/types';
import serverEmulator from './serverEmulator';
import {
  clearLoadActions, IRemoteTableProps, LOAD_DATA, loadData, remoteReducer,
} from './tableRemote';

const DeleteRow: React.FC<ICellTextProps> = ({
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

const remoteDataDispatch = (baseDispath: DispatchFunc, tableProps: ITableProps) => {
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ActionType.DeleteRow) {
      dispatch(showLoading());
      serverEmulator.delete(action.rowKeyValue).then((result) => {
        dispatch(loadData());
      });
    } else if (action.type === ActionType.UpdateCellValue) {
      dispatch(showLoading());
      serverEmulator.update(action.rowKeyValue, { [action.columnKey]: action.value }).then(() => {
        dispatch(loadData());
      });
    } else if (action.type === ActionType.UpdateSortDirection || action.type === ActionType.UpdatePageIndex) {
      dispatch(loadData());
    } else if (action.type === LOAD_DATA) {
      dispatch(showLoading());
      serverEmulator.get(tableProps.paging, tableProps.columns, action?.pageIndex).then((result) => {
        dispatch(updatePagesCount(result.pagesCount));
        dispatch(updateData(result.data));
        dispatch(hideLoading());
      });
    }
    baseDispath(action);
  };
  return dispatch;
};

const RemoteDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = remoteDataDispatch((action) => {
    changeTableProps((prevState: ITableProps) => remoteReducer(prevState, action));
  }, tableProps);

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
          },
          noDataRow: {
            content: () => 'No data'
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default RemoteDataDemo;

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import {
  deleteRow, hideLoading, showLoading, updateData, updatePagesCount,
} from '../../lib/actionCreators';
import { ActionType, DataType, EditingMode } from '../../lib/enums';
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
  loading: {
    enabled: true,
    text: 'Loading Data..'
  },
  paging: {
    enabled: true,
    pageIndex: 1,
    pageSize: 10
  },
  noDataRow: () => 'No data',
  rowKeyField: 'id',
};

const RemoteDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ActionType.DeleteRow) {
      dispatch(showLoading('Deleting Row..'));
      serverEmulator.delete(action.rowKeyValue, tableProps.paging).then((result) => {
        dispatch(updatePagesCount(result.pagesCount));
        dispatch(updateData(result.data));
        dispatch(hideLoading());
      });
    } else if (action.type === ActionType.UpdateCellValue) {
      dispatch(showLoading('Updating Data..'));
      const column = tableProps.columns.find((c) => c.key === action.columnKey)!;
      serverEmulator.update(action.rowKeyValue, { [getField(column)]: action.value }, tableProps.paging).then((result) => {
        dispatch(updatePagesCount(result.pagesCount));
        dispatch(updateData(result.data));
        dispatch(hideLoading());
      });
    } else if (action.type === ActionType.UpdatePageIndex) {
      dispatch(showLoading('Loading Data..'));
      serverEmulator.get({ ...tableProps.paging, pageIndex: action.pageIndex }).then((result) => {
        dispatch(updatePagesCount(result.pagesCount));
        dispatch(updateData(result.data));
        dispatch(hideLoading());
      });
    }
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  if (!tableProps.data) {
    serverEmulator.get(tableProps.paging).then(
      (result) => {
        dispatch(updatePagesCount(result.pagesCount));
        dispatch(updateData(result.data));
        dispatch(hideLoading());
      },
    );
  }

  return (
    <div className='remote-data-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default RemoteDataDemo;

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import {
  hideLoading, loadData, setSingleAction, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';
import { ActionType, DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import serverEmulator from './serverEmulator';

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  loading: {
    enabled: true
  },
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10
  },
  singleAction: loadData(),
  rowKeyField: 'id',
};

const RemoteDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = async (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));

    if (action.type === ActionType.LoadData) {
      dispatch(showLoading());
      const result = await serverEmulator.get(tableProps.paging, tableProps.columns, action?.pageIndex);
      dispatch(updatePagesCount(result.pagesCount));
      dispatch(updateData(result.data));
      dispatch(hideLoading());
    } else if (action.type === ActionType.UpdatePageIndex) {
      dispatch(setSingleAction(loadData()));
    }
  };

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

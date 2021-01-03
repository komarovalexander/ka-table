import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import {
  hideLoading, loadData, setSingleAction, showLoading, updateData, updatePagesCount,
} from '../../lib/actionCreators';
import { ActionType, DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { DeleteRow } from './components';
import serverEmulator from './serverEmulator';

const tablePropsInit: ITableProps = {
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
  singleAction: loadData(),
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10
  },
  sortingMode: SortingMode.SingleTripleStateRemote,
  rowKeyField: 'id',
};

const RemoteDataEditingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = async (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));

    if (action.type === ActionType.DeleteRow) {
      dispatch(showLoading());
      await serverEmulator.delete(action.rowKeyValue);
      dispatch(setSingleAction(loadData()));
    } else if (action.type === ActionType.UpdateCellValue) {
      dispatch(showLoading());
      await serverEmulator.update(action.rowKeyValue, { [action.columnKey]: action.value });
      dispatch(setSingleAction(loadData()));
    } else if (action.type === ActionType.UpdateSortDirection || action.type === ActionType.UpdatePageIndex) {
      dispatch(setSingleAction(loadData()));
    } else if (action.type === ActionType.LoadData) {
      dispatch(showLoading());
      const result = await serverEmulator.get(tableProps.paging, tableProps.columns, action?.pageIndex);
      dispatch(updatePagesCount(result.pagesCount));
      dispatch(updateData(result.data));
      dispatch(hideLoading());
    }
  };

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

export default RemoteDataEditingDemo;

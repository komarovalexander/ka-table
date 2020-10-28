import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import {
  deleteRow, hideLoading, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';
import { ActionType, DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { ICellTextProps } from 'ka-table/props';
import { DispatchFunc } from 'ka-table/types';
import { getField } from 'ka-table/Utils/ColumnUtils';
import serverEmulator from './serverEmulator';

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

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', field: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: ':delete', style: { width: 40, textAlign: 'center' }},
  ],
  editingMode: EditingMode.Cell,
  loading: {
    enabled: true,
    text: 'Loading Data..'
  },
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10
  },
  sortingMode: SortingMode.SingleRemote,
  rowKeyField: 'id',
};

const initGetData = (props: ITableProps, dispatch: DispatchFunc) => {
  return (action?: any) => {
    serverEmulator.get(props.paging, props.columns, action?.pageIndex).then((result) => {
      dispatch(updatePagesCount(result.pagesCount));
      dispatch(updateData(result.data));
      dispatch(hideLoading());
    });
  }
};

const RemoteDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    if (action.type === ActionType.DeleteRow) {
      dispatch(showLoading('Deleting Row..'));
      serverEmulator.delete(action.rowKeyValue).then((result) => {
        getData(action);
      });
    } else if (action.type === ActionType.UpdateCellValue) {
      dispatch(showLoading('Updating Data..'));
      const column = tableProps.columns.find((c) => c.key === action.columnKey)!;
      serverEmulator.update(action.rowKeyValue, { [getField(column)]: action.value }).then(() => {
        getData(action);
      });
    } else if (action.type === ActionType.UpdatePageIndex) {
      dispatch(showLoading('Loading Data..'));
      getData(action);
    } else if (action.type === ActionType.UpdateSortDirection) {
      dispatch(showLoading('Loading Data..'));
      initGetData(kaReducer(tableProps, action), dispatch)(action);
    }
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  const getData = initGetData(tableProps, dispatch);

  if (!tableProps.data) {
    getData();
  }

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

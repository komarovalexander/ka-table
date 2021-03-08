import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { hideLoading, showLoading, updateData } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import serverEmulator from './serverEmulator';

const LOAD_MORE_DATA = 'LOAD_MORE_DATA';

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  rowKeyField: 'id',
  virtualScrolling: {
    enabled: true
  },
  singleAction: { type: LOAD_MORE_DATA }
};

const InfiniteScrollingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [pageIndex, changePageIndex] = useState(0);

  const dispatch: DispatchFunc = async (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    if (pageIndex !== -1) {
      if (action.type === LOAD_MORE_DATA) {
        dispatch(showLoading());
        const result = await serverEmulator.get(pageIndex);
        changePageIndex(result.pageIndex);
        dispatch(updateData([...tableProps.data || [], ...result.data]));
        dispatch(hideLoading());
      }
    }
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
      childComponents={{
        tableWrapper: {
          elementAttributes: () => ({
            onScroll: (event, { baseFunc }) => {
              baseFunc(event);
              const element =  event.currentTarget;
              if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
                dispatch({ type: LOAD_MORE_DATA });
              }
            },
            style: { maxHeight: 600 }
          })
        }
      }}
    />
  );
};

export default InfiniteScrollingDemo;

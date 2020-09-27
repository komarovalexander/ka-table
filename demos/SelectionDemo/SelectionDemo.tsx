import './SelectionDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import {
  deselectAllFilteredRows, deselectRow, selectAllFilteredRows, selectRow, selectRowsRange,
} from 'ka-table/actionCreators';
import { DataType, FilteringMode, SortingMode } from 'ka-table/enums';
import { ICellTextProps, IHeadCellProps } from 'ka-table/props';
import { DispatchFunc } from 'ka-table/types';
import { kaPropsUtils } from 'ka-table/utils';

const dataArray = Array(64).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const SelectionCell: React.FC<ICellTextProps> = ({
  rowKeyValue, dispatch, isSelectedRow, selectedRows
}) => {
  return (
    <input
      type='checkbox'
      checked={isSelectedRow}
      onChange={(event: any) => {
        if (event.nativeEvent.shiftKey){
          dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
        } else if (event.currentTarget.checked) {
          dispatch(selectRow(rowKeyValue));
        } else {
          dispatch(deselectRow(rowKeyValue));
        }
      }}
    />
  );
};

const SelectionHeader: React.FC<IHeadCellProps> = ({
  dispatch, areAllRowsSelected,
}) => {
  return (
    <input
      type='checkbox'
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch(selectAllFilteredRows()); // also available: selectAllVisibleRows(), selectAllRows()
        } else {
          dispatch(deselectAllFilteredRows()); // also available: deselectAllVisibleRows(), deselectAllRows()
        }
      }}
    />
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      key: 'selection-cell',
    },
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  paging: {
    enabled: true,
  },
  data: dataArray,
  rowKeyField: 'id',
  selectedRows: [3, 5],
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow,
};

const SelectionDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <div className='selection-demo'>
      <Table
        {...tableProps}
        childComponents={{
          cellText: {
            content: (props) => {
              if (props.column.key === 'selection-cell'){
                return <SelectionCell {...props} />
              }
            }
          },
          filterRowCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell'){
                return <></>;
              }
            }
          },
          headCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell'){
                return (
                  <SelectionHeader {...props}
                    areAllRowsSelected={kaPropsUtils.areAllFilteredRowsSelected(tableProps)}
                    // areAllRowsSelected={kaPropsUtils.areAllVisibleRowsSelected(tableProps)}
                  />
                );
              }
            }
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default SelectionDemo;

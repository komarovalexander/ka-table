import './KeyboardNavigation.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import {
  clearFocused, moveFocusedDown, moveFocusedLeft, moveFocusedRight, moveFocusedUp, openEditor,
  setFocused, updatePageIndex, updateSortDirection,
} from 'ka-table/actionCreators';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(100).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  editingMode: EditingMode.Cell,
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10,
  },
  focused: {
    cell: {
      columnKey: 'column4',
      rowKeyValue: 2
    }
  }
};

const KeyboardNavigationDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <>
      <p style={{fontSize: 12}}>Use arrow keys to navigate by data cells</p>
      <Table
        {...tableProps}
        childComponents={{
          cell: {
            elementAttributes: ({column, rowKeyValue, isEditableCell}) => {
              if (isEditableCell) return undefined;

              const cell = { columnKey: column.key, rowKeyValue }
              const isFocused = cell.columnKey === tableProps.focused?.cell?.columnKey
                && cell.rowKeyValue === tableProps.focused?.cell?.rowKeyValue;
              return {
                tabIndex: 0,
                ref: (ref: any) => isFocused && ref?.focus(),
                onKeyUp: (e) => {
                  switch (e.keyCode){
                    case 39: dispatch(moveFocusedRight({ end: e.ctrlKey })); break;
                    case 37: dispatch(moveFocusedLeft({ end: e.ctrlKey })); break;
                    case 38: dispatch(moveFocusedUp({ end: e.ctrlKey })); break;
                    case 40: dispatch(moveFocusedDown({ end: e.ctrlKey })); break;
                    case 13:
                      dispatch(openEditor(cell.rowKeyValue, cell.columnKey));
                      dispatch(setFocused({ cellEditorInput: cell }));
                      break;
                  }
                },
                onFocus: () => !isFocused &&  dispatch(setFocused({ cell: { columnKey: column.key, rowKeyValue } })),
                onKeyDown: (e) => e.keyCode !== 9 && e.preventDefault(),
                onBlur: () => isFocused && dispatch(clearFocused())
              }
            },
          },
          cellEditorInput: {
            elementAttributes: ({column, rowKeyValue}) => {
              const isFocused = column.key === tableProps.focused?.cellEditorInput?.columnKey
                && rowKeyValue === tableProps.focused?.cellEditorInput?.rowKeyValue;
              const cell = { columnKey: column.key, rowKeyValue };
              return {
                ref: (ref: any) => isFocused && ref?.focus(),
                onKeyUp: (e) => e.keyCode === 13 && dispatch(setFocused({ cell })),
                onBlur: (e, {baseFunc}) => {
                  baseFunc();
                  dispatch(clearFocused())
                },
                onFocus: () => !isFocused && dispatch(setFocused({ cell: { columnKey: column.key, rowKeyValue } })),
              }
            },
          },
          pagingIndex: {
            elementAttributes: (props) => ({
              tabIndex: 0,
              onKeyUp: (e) => e.keyCode === 13 && dispatch(updatePageIndex(props.pageIndex))
            }),
          },
          headCell: {
            elementAttributes: (props) => ({
              tabIndex: 0,
              onKeyUp: (e) => e.keyCode === 13 && dispatch(updateSortDirection(props.column.key))
            }),
          },
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default KeyboardNavigationDemo;

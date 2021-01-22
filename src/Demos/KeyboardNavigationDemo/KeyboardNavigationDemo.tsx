import './KeyboardNavigation.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import {
  clearFocused, moveFocusedDown, moveFocusedLeft, moveFocusedRight, moveFocusedUp, openEditor,
  setFocused,
} from '../../lib/actionCreators';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { getValueByField } from '../../lib/Utils/DataUtils';
import { getData } from '../../lib/Utils/PropsUtils';

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

  const tabIndex = tableProps.focused || {
    cell: {
      columnKey: tableProps.columns[0].key,
      rowKeyValue: getValueByField(getData(tableProps)[0], tableProps.rowKeyField)
    }
  }
  return (
    <>
      <p style={{fontSize: 12}}>Use arrow keys to navigate by data cells</p>
      <Table
        {...tableProps}
        childComponents={{
          cell: {
            elementAttributes: ({column, rowKeyValue, isEditableCell}) => {
              if (isEditableCell) return undefined;

              const isFocused = column.key === tableProps.focused?.cell?.columnKey
                && rowKeyValue === tableProps.focused?.cell?.rowKeyValue;
              const hasTabIndex = column.key === tabIndex?.cell?.columnKey
                && rowKeyValue === tabIndex?.cell?.rowKeyValue;
              return {
                tabIndex: hasTabIndex ? 0 : undefined,
                ref: (ref: any) => isFocused && ref?.focus(),
                onKeyUp: (e) => {
                  const cell = { columnKey: column.key, rowKeyValue }
                  switch (e.keyCode){
                    case 39: dispatch(moveFocusedRight({ end: e.ctrlKey, nextRow: true })); break;
                    case 37: dispatch(moveFocusedLeft({ end: e.ctrlKey, nextRow: true })); break;
                    case 38: dispatch(moveFocusedUp({ end: e.ctrlKey })); break;
                    case 40: dispatch(moveFocusedDown({ end: e.ctrlKey })); break;
                    case 13:
                      dispatch(openEditor(cell.rowKeyValue, cell.columnKey));
                      dispatch(setFocused({ cellEditorInput: cell }));
                      break;
                  }
                },
                onFocus: () => {
                  if (!tableProps.focused){
                    dispatch(setFocused({
                      cell: {
                        columnKey: column.key,
                        rowKeyValue
                      }
                    }));
                  }
                },
                onKeyDown: (e) => {
                  if (e.keyCode !== 9) {
                    e.preventDefault();
                  }
                },
                onBlur: () => {
                  dispatch(clearFocused())
                }
              }
            },
          },
          cellEditorInput: {
            elementAttributes: ({column, rowKeyValue}) => {
              const isFocused = column.key === tableProps.focused?.cellEditorInput?.columnKey
                && rowKeyValue === tableProps.focused?.cellEditorInput?.rowKeyValue;
              return {
                ref: (ref: any) => isFocused && ref?.focus(),
                onKeyUp: (e) => {
                  if (e.keyCode === 13){
                    const cell = { columnKey: column.key, rowKeyValue }
                    dispatch(setFocused({ cell }));
                  }
                },
                onBlur: (e, {baseFunc}) => {
                  baseFunc();
                  dispatch(clearFocused())
                },
              }
            },
          },
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default KeyboardNavigationDemo;

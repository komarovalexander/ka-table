import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import CellEditorString from '../../lib/Components/CellEditorString/CellEditorString';
import { DataType, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { getValueByField } from '../../lib/Utils/DataUtils';
import { getData } from '../../lib/Utils/PropsUtils';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const KEYBOARD_NAVIGATION = 'KEYBOARD_NAVIGATION';
const FOCUS_CELL = 'FOCUS_CELL';

interface IFocusedProps extends ITableProps {
  focusedCell?: {
    columnKey: string,
    rowKeyValue: any
  }
}

const tablePropsInit: IFocusedProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  focusedCell: {
    columnKey: 'column4',
    rowKeyValue: 2
  }
};

const keyboardReducer = (props: IFocusedProps, action: any) => {
  if (action.type === KEYBOARD_NAVIGATION){
    if (action.key === 'ArrowRight') {
      const columnIndex = props.columns.findIndex(c => c.key === action.columnKey);
      const hasNextColumn = columnIndex < props.columns.length - 1;
      const nextColumn = hasNextColumn ? props.columns[columnIndex + 1] : props.columns[0];
      let rowKeyValue = action.rowKeyValue;
      if (!hasNextColumn){
        const visibleData = getData(props);
        const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === action.rowKeyValue);
        if (rowIndex < visibleData.length - 1){
          const nextRow = visibleData[rowIndex + 1];
          rowKeyValue = getValueByField(nextRow, props.rowKeyField);
        } else {
          return props;
        }
      }
      return { ...props, focusedCell: { columnKey: nextColumn.key, rowKeyValue } };
    }
    if (action.key === 'ArrowLeft') {
      const columnIndex = props.columns.findIndex(c => c.key === action.columnKey);
      const hasNextColumn = 0 < columnIndex;
      const nextColumn = hasNextColumn ? props.columns[columnIndex - 1] : props.columns[props.columns.length - 1];
      let rowKeyValue = action.rowKeyValue;
      if (!hasNextColumn){
        const visibleData = getData(props);
        const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === action.rowKeyValue);
        if (rowIndex > 0){
          const nextRow = visibleData[rowIndex - 1];
          rowKeyValue = getValueByField(nextRow, props.rowKeyField);
        } else {
          return props;
        }
      }
      return { ...props, focusedCell: { columnKey: nextColumn.key, rowKeyValue } };
    }
    if (action.key === 'ArrowUp') {
      let rowKeyValue = action.rowKeyValue;
      const visibleData = getData(props);
      const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === action.rowKeyValue);
      if (rowIndex > 0){
        const nextRow = visibleData[rowIndex - 1];
        rowKeyValue = getValueByField(nextRow, props.rowKeyField);
      }
      return { ...props, focusedCell: { columnKey: action.columnKey, rowKeyValue } };
    }
    if (action.key === 'ArrowDown') {
      let rowKeyValue = action.rowKeyValue;
      const visibleData = getData(props);
      const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === action.rowKeyValue);
      if (rowIndex < visibleData.length - 1){
        const nextRow = visibleData[rowIndex + 1];
        rowKeyValue = getValueByField(nextRow, props.rowKeyField);
      }
      return { ...props, focusedCell: { columnKey: action.columnKey, rowKeyValue } };
    }
  }
  if (action.type === FOCUS_CELL){
    return { ...props, focusedCell: { columnKey: action.columnKey, rowKeyValue: action.rowKeyValue } };
  }
  return kaReducer(props, action);
}


const KeyboardNavigationDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => keyboardReducer(prevState, action));
  };

  return (
    <>
      <p style={{fontSize: 12, color: 'red'}}>This demo just a prototype to show how ka-table can be customized using custom reducer. There will be refactoring soon.</p>
      <Table
        {...tableProps}
        childComponents={{
          cell: {
            elementAttributes: (props) => {
              const isFocused = props.column.key === tableProps.focusedCell?.columnKey
                && props.rowKeyValue === tableProps?.focusedCell?.rowKeyValue;
              return {
                tabIndex: isFocused ? 0 : undefined,
                ref: (ref: any) => isFocused && ref?.focus(),
                onKeyDown: (e) => {
                  props.dispatch({
                    type: KEYBOARD_NAVIGATION,
                    key: e.key,
                    columnKey: props.column.key,
                    rowKeyValue: props.rowKeyValue
                  })
                  e.stopPropagation();
                  e.preventDefault();
                },
                onClick: () => {
                  props.dispatch({
                    type: FOCUS_CELL,
                    columnKey: props.column.key,
                    rowKeyValue: props.rowKeyValue
                  });
                }
              }
            },
          }
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default KeyboardNavigationDemo;

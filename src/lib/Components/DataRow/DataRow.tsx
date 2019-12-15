import React from 'react';

import defaultOptions from '../../defaultOptions';
import { isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';
import EmptyCells from '../EmptyCells/EmptyCells';
import { IRowProps } from '../Row/Row';

const DataRow: React.FunctionComponent<IRowProps> = ({
  columns,
  editableCells,
  editingMode,
  groupColumnsCount,
  dispatch,
  onRowDataChanged,
  rowData,
  rowKeyField,
  selectedRows = [],
  height,
  trRef,
}) => {
  const rowKeyValue = rowData[rowKeyField];
  const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
  const isSelectedRow = selectedRows.some((s) => s === rowKeyValue);
  return (
    <tr ref={trRef} style={{height}} className={`${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`}>
      <EmptyCells count={groupColumnsCount}/>
      {columns.map((column) => (
        <CellComponent
          column={column}
          editingMode={editingMode}
          isEditableCell={isEditableCell(editingMode, column, rowEditableCells)}
          isSelectedRow={isSelectedRow}
          key={column.key}
          dispatch={dispatch}
          onRowDataChanged={onRowDataChanged}
          rowData={rowData}
          rowKeyField={rowKeyField}
        />
      ))}
    </tr>
  );
};

export default DataRow;

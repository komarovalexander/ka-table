import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { EventFunc, RowDataChangedFunc } from '../../types';
import { isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IRowProps {
  columns: Column[];
  editableCells: Cell[];
  editingMode: EditingMode;
  groupColumnsCount: number;
  onEvent: EventFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const Row: React.FunctionComponent<IRowProps> = ({
  columns,
  editableCells,
  editingMode,
  groupColumnsCount,
  onEvent,
  onRowDataChanged,
  rowData,
  rowKey,
}) => {
  const rowEditableCells = getRowEditableCells(rowData[rowKey], editableCells);
  return (
    <tr className={defaultOptions.css.row}>
      <EmptyCells count={groupColumnsCount}/>
      {columns.map((column) => (
        <CellComponent
          column={column}
          editingMode={editingMode}
          isEditableCell={isEditableCell(editingMode, column.field, rowEditableCells)}
          key={column.key || column.field}
          onEvent={onEvent}
          onRowDataChanged={onRowDataChanged}
          rowData={rowData}
          rowKey={rowKey}
        />
      ))}
    </tr>
  );
};

export default Row;

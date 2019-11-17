import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc, RowDataChangedFunc } from '../../types';
import { isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';

export interface IRowProps {
  editableCells: Cell[];
  editingMode: EditingMode;
  columns: Column[];
  groupColumnsCount: number;
  onRowDataChanged: RowDataChangedFunc;
  onOptionChanged: OptionChangedFunc;
  rowKey: any;
  rowData: any;
}

const getEmptyColumns = (count: number) => {
  const columns = [];
  for (let i = 0; i < count; i++) {
    columns.push(<td className='tc-empty-column'/>);
  }
  return columns;
};

const Row: React.FunctionComponent<IRowProps> = ({
  columns,
  editableCells,
  editingMode,
  groupColumnsCount,
  onOptionChanged,
  onRowDataChanged,
  rowData,
  rowKey,
}) => {
  const rowEditableCells = getRowEditableCells(rowData[rowKey], editableCells);
  return (
    <tr className={defaultOptions.css.row}>
      {getEmptyColumns(groupColumnsCount)}
      {columns.map((column) => (
        <CellComponent
          key={column.field}
          rowData={rowData}
          column={column}
          rowKey={rowKey}
          editingMode={editingMode}
          isEditableCell={isEditableCell(editingMode, column.field, rowEditableCells)}
          editableCells={editableCells}
          onOptionChanged={onOptionChanged}
          onRowDataChanged={onRowDataChanged}
        />
      ))}
    </tr>
  );
};

export default Row;

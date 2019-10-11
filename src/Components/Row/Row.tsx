import React from 'react';

import { EditingMode } from '../../Enums/EditingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { RowDataChangedFunc } from '../../Types/RowDataChangedFunc';
import { isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';

export interface IRowProps {
  editableCells: Cell[];
  editingMode: EditingMode;
  columns: Column[];
  onRowDataChanged: RowDataChangedFunc;
  onOptionChanged: OptionChangedFunc;
  rowKey: any;
  rowData: any;
}

const Row: React.FunctionComponent<IRowProps> = ({
  columns,
  editableCells,
  editingMode,
  onOptionChanged,
  onRowDataChanged,
  rowData,
  rowKey,
}) => {
  const rowEditableCells = getRowEditableCells(rowData[rowKey], editableCells);
  return (
    <tr className='tc-row'>
      {columns.map((column) => (
        <CellComponent
          key={column.field}
          rowData={rowData}
          column={column}
          rowKey={rowKey}
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

import React from 'react';

import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { isEditableCell } from '../../Utils/CellUtils';
import CellComponent from '../CellComponent/CellComponent';

export interface IRowProps {
  columns: Column[];
  rowKeyValue: any;
  rowData: any;
  rowEditableCells?: Cell[];
}

const Row: React.FunctionComponent<IRowProps> = ({ columns, rowData, rowKeyValue, rowEditableCells }) => {
  return (
    <tr>
      {columns.map((column) => (
        <CellComponent
          key={column.field}
          rowData={rowData}
          field={column.field}
          rowKeyValue={rowKeyValue}
          isEditableCell={isEditableCell(column.field, rowEditableCells)}
        />
      ))}
    </tr>
  );
};

export default Row;

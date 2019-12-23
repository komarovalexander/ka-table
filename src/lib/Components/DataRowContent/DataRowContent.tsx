import React from 'react';

import { Cell } from '../../Models/Cell';
import { isEditableCell } from '../../Utils/CellUtils';
import CellComponent from '../CellComponent/CellComponent';
import { IRowCommonProps } from '../DataRow/DataRow';

export interface IDataRowProps extends IRowCommonProps {
  rowKeyValue: any;
  rowEditableCells: Cell[];
  isSelectedRow: boolean;
}

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
  columns,
  rowEditableCells,
  editingMode,
  isSelectedRow,
  dispatch,
  onRowDataChanged,
  rowData,
  rowKeyField,
}) => {
  return (
    <>
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
    </>
  );
};

export default DataRowContent;

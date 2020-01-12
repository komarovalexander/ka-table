import React from 'react';

import { isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';
import { IRowCommonProps } from '../DataRow/DataRow';

export interface IDataRowProps extends IRowCommonProps {
  isSelectedRow: boolean;
}

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
  childAttributes,
  columns,
  dispatch,
  editableCells,
  editingMode,
  isSelectedRow,
  rowData,
  rowKeyField,
}) => {
  const rowKeyValue = rowData[rowKeyField];
  const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
  return (
    <>
      {columns.map((column) => (
        <CellComponent
          column={column}
          childAttributes={childAttributes}
          editingMode={editingMode}
          isEditableCell={isEditableCell(editingMode, column, rowEditableCells)}
          isSelectedRow={isSelectedRow}
          key={column.key}
          dispatch={dispatch}
          rowData={rowData}
          rowKeyField={rowKeyField}
        />
      ))}
    </>
  );
};

export default DataRowContent;

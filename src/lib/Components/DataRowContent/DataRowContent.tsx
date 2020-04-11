import React from 'react';

import { getEditableCell, isEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent, { unspecifiedEditorValue } from '../CellComponent/CellComponent';
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
  rowKeyValue,
}) => {
  const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
  return (
    <>
      {columns.map((column) => {
        const editableCell = getEditableCell(column, rowEditableCells);

        return (
          <CellComponent
            childAttributes={childAttributes}
            column={column}
            dispatch={dispatch}
            editingMode={editingMode}
            editorValue={(editableCell && editableCell.hasOwnProperty('value')) ?  editableCell.value : unspecifiedEditorValue}
            isEditableCell={!!editableCell}
            isSelectedRow={isSelectedRow}
            key={column.key}
            rowData={rowData}
            rowKeyField={rowKeyField}
            rowKeyValue={rowKeyValue}
          />
        );
      })}
    </>
  );
};

export default DataRowContent;

import React from 'react';

import { getEditableCell } from '../../Utils/CellUtils';
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
            isEditableCell={!!editableCell}
            isSelectedRow={isSelectedRow}
            editorValue={editableCell && editableCell.editorValue}
            hasEditorValue={editableCell && editableCell.hasOwnProperty('editorValue')}
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

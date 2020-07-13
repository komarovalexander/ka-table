import React from 'react';

import { FormatFunc, ValidationFunc } from '../../types';
import { getEditableCell } from '../../Utils/CellUtils';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import CellComponent from '../CellComponent/CellComponent';
import { IRowCommonProps } from '../DataRow/DataRow';

export interface IDataRowProps extends IRowCommonProps {
  format?: FormatFunc;
  validation?: ValidationFunc;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
}

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
  childComponents,
  columns,
  dispatch,
  editableCells,
  editingMode,
  format,
  isDetailsRowShown,
  isSelectedRow,
  rowData,
  rowKeyField,
  rowKeyValue,
  validation,
}) => {
  const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
  return (
    <>
      {columns.map((column) => {
        const editableCell = getEditableCell(column, rowEditableCells);

        return (
          <CellComponent
            childComponents={childComponents}
            column={column}
            dispatch={dispatch}
            editingMode={editingMode}
            editorValue={editableCell && editableCell.editorValue}
            format={format}
            hasEditorValue={editableCell && editableCell.hasOwnProperty('editorValue')}
            isDetailsRowShown={isDetailsRowShown}
            isEditableCell={!!editableCell}
            isSelectedRow={isSelectedRow}
            key={column.key}
            rowData={rowData}
            rowKeyField={rowKeyField}
            rowKeyValue={rowKeyValue}
            validation={validation}
            validationMessage={editableCell && editableCell.validationMessage}
          />
        );
      })}
    </>
  );
};

export default DataRowContent;

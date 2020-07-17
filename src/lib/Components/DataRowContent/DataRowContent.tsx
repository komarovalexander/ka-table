import React from 'react';

import { EditableCell } from '../../Models/EditableCell';
import { FormatFunc, ValidationFunc } from '../../types';
import { getEditableCell } from '../../Utils/CellUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import CellComponent from '../CellComponent/CellComponent';
import { IRowCommonProps } from '../DataRow/DataRow';

export interface IDataRowProps extends IRowCommonProps {
  format?: FormatFunc;
  validation?: ValidationFunc;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowEditableCells: EditableCell[]
}

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
  childComponents,
  columns,
  dispatch,
  editingMode,
  format,
  isDetailsRowShown,
  isSelectedRow,
  rowData,
  rowEditableCells,
  rowKeyField,
  rowKeyValue,
  validation,
}) => {
  return (
    <>
      {columns.map((column) => {
        const editableCell = getEditableCell(column, rowEditableCells);
        const hasEditorValue = editableCell && editableCell.hasOwnProperty('editorValue');
        const editorValue = editableCell && editableCell.editorValue;
        const value = hasEditorValue ? editorValue : getValueByColumn(rowData, column);

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
            value={value}
          />
        );
      })}
    </>
  );
};

export default DataRowContent;

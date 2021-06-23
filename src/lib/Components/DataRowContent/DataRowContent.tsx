import React from 'react';

import { collapseTreeParent, expandTreeParent } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IDataRowProps } from '../../props';
import { getEditableCell } from '../../Utils/CellUtils';
import { getField } from '../../Utils/ColumnUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import CellComponent from '../CellComponent/CellComponent';

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
  childComponents,
  columns,
  deep,
  dispatch,
  editingMode,
  format,
  isDetailsRowShown,
  isSelectedRow,
  isTreeExpanded,
  isTreeParent,
  rowData,
  rowEditableCells,
  rowKeyField,
  rowKeyValue,
  selectedRows,
  validation,
}) => {
  const arrow = isTreeParent ? [(
    <div
      onClick={() => { dispatch(isTreeExpanded ? collapseTreeParent(rowKeyValue) : expandTreeParent(rowKeyValue)); }}
      className={isTreeExpanded
        ? defaultOptions.css.iconTreeArrowExpanded : defaultOptions.css.iconTreeArrowCollapsed}
    />
  )] : undefined;
  return (
    <>
      {columns.map((column, index) => {
        const editableCell = getEditableCell(column, rowEditableCells);
        const hasEditorValue = editableCell && editableCell.hasOwnProperty('editorValue');
        const editorValue = editableCell && editableCell.editorValue;
        const value = hasEditorValue ? editorValue : getValueByColumn(rowData, column);
        const cellDeep = deep != null && index === 0 ? deep : undefined;
        return (
          <CellComponent
            treeArrowElement={arrow?.pop()}
            childComponents={childComponents}
            deep={cellDeep}
            column={column}
            dispatch={dispatch}
            editingMode={editingMode}
            editorValue={editorValue}
            field={getField(column)}
            format={format}
            hasEditorValue={editableCell && editableCell.hasOwnProperty('editorValue')}
            isDetailsRowShown={isDetailsRowShown}
            isEditableCell={!!editableCell}
            isSelectedRow={isSelectedRow}
            key={column.key}
            rowData={rowData}
            rowKeyField={rowKeyField}
            rowKeyValue={rowKeyValue}
            selectedRows={selectedRows}
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

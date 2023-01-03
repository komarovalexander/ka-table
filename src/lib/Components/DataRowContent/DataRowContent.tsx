import React from 'react';

import { updateTreeGroupsExpanded } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IDataRowProps } from '../../props';
import { getEditableCell } from '../../Utils/CellUtils';
import { getField } from '../../Utils/ColumnUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import CellComponent from '../CellComponent/CellComponent';

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
  childComponents,
  columns,
  treeDeep,
  dispatch,
  editingMode,
  format,
  isDetailsRowShown,
  isSelectedRow,
  isTreeExpanded,
  isTreeGroup,
  rowData,
  rowEditableCells,
  rowKeyField,
  rowKeyValue,
  selectedRows,
  validation,
  treeExpandButtonColumnKey
}) => {
  const arrow = isTreeGroup ? (
    <div
      onClick={() => dispatch(updateTreeGroupsExpanded(rowKeyValue))}
      className={isTreeExpanded
        ? defaultOptions.css.iconTreeArrowExpanded : defaultOptions.css.iconTreeArrowCollapsed}
    />
  ) : undefined;
  return (
    <>
      {columns.map((column, index) => {
        const editableCell = getEditableCell(column, rowEditableCells);
        const hasEditorValue = editableCell && editableCell.hasOwnProperty('editorValue');
        const editorValue = editableCell && editableCell.editorValue;
        const value = hasEditorValue ? editorValue : getValueByColumn(rowData, column);
        const isTreeColumn = treeExpandButtonColumnKey ? treeExpandButtonColumnKey === column.key : index === 0;
        const cellDeep = treeDeep != null && isTreeColumn ? treeDeep : undefined;
        return (
          <CellComponent
            treeArrowElement={isTreeColumn && arrow}
            childComponents={childComponents}
            treeDeep={cellDeep}
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

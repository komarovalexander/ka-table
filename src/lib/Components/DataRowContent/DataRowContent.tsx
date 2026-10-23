import CellComponent, { CellComponentMemo } from '../CellComponent/CellComponent';

import { CollapsedIcon } from '../../Icons/CollapsedIcon';
import { ExpandedIcon } from '../../Icons/ExpandedIcon';
import { IDataRowProps } from '../../props';
import { MemoizedRowsContext } from '../Rows/MemoizedRowsContext';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { buttonAttributes, getAriaLabel } from '../../Utils/AriaUtils';
import { getEditableCell } from '../../Utils/CellUtils';
import { getField } from '../../Utils/ColumnUtils';
import { getFormattedValue, getValueByColumn } from '../../Utils/DataUtils';
import { updateTreeGroupsExpanded } from '../../actionCreators';

const DataRowContent: React.FunctionComponent<IDataRowProps> = ({
    childComponents,
    columns,
    treeDeep,
    dispatch,
    editingMode,
    focusedColumnKey,
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
    const Cell = React.useContext(MemoizedRowsContext) ? CellComponentMemo : CellComponent;
    // the button is named by the text of its cell, aria-expanded tells its state
    const getTreeArrow = (label?: string) => (
        <div
            className='ka-icon-tree-arrow'
            {...buttonAttributes}
            aria-expanded={!!isTreeExpanded}
            aria-label={label || getAriaLabel(rowKeyValue)}
            onClick={() => dispatch(updateTreeGroupsExpanded(rowKeyValue))}>
            {isTreeExpanded
                ? <ExpandedIcon className={defaultOptions.css.iconTreeArrowExpanded} />
                : <CollapsedIcon className={defaultOptions.css.iconTreeArrowCollapsed} />}
        </div>
    );
    return (
        <>
            {columns.map((column, index) => {
                const editableCell = getEditableCell(column, rowEditableCells);
                const hasEditorValue = editableCell && Object.prototype.hasOwnProperty.call(editableCell, 'editorValue');
                const editorValue = editableCell && editableCell.editorValue;
                const value = hasEditorValue ? editorValue : getValueByColumn(rowData, column);
                const isTreeColumn = treeExpandButtonColumnKey ? treeExpandButtonColumnKey === column.key : index === 0;
                const cellDeep = treeDeep != null && isTreeColumn ? treeDeep : undefined;
                const treeArrowElement = isTreeGroup && isTreeColumn
                    ? getTreeArrow(getAriaLabel(getFormattedValue(value, column, rowData, format)))
                    : undefined;
                return (
                    <Cell
                        treeArrowElement={treeArrowElement}
                        childComponents={childComponents}
                        treeDeep={cellDeep}
                        column={column}
                        dispatch={dispatch}
                        editingMode={editingMode}
                        editorValue={editorValue}
                        field={getField(column)}
                        format={format}
                        hasEditorValue={editableCell && Object.prototype.hasOwnProperty.call(editableCell, 'editorValue')}
                        isDetailsRowShown={isDetailsRowShown}
                        isEditableCell={!!editableCell}
                        isFocused={focusedColumnKey === column.key}
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

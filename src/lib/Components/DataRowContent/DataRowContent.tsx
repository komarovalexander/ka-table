import CellComponent from '../CellComponent/CellComponent';
import { CollapsedIcon } from '../../Icons/CollapsedIcon';
import { ExpandedIcon } from '../../Icons/ExpandedIcon';
import { IDataRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getEditableCell } from '../../Utils/CellUtils';
import { getField } from '../../Utils/ColumnUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import { updateTreeGroupsExpanded } from '../../actionCreators';

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
    const arrow = isTreeGroup
        ? (<div className='ka-icon-tree-arrow' onClick={() => dispatch(updateTreeGroupsExpanded(rowKeyValue))}>{(
            isTreeExpanded
                ? <ExpandedIcon className={defaultOptions.css.iconTreeArrowExpanded} />
                : <CollapsedIcon className={defaultOptions.css.iconTreeArrowCollapsed} />
        )}</div>) : undefined;
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

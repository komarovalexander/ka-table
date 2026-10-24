import { ActionType, EditingMode } from '../enums';
import { Column, EditableCell } from '../models';
import { updateCellValue, updatePopupPosition } from '../actionCreators';

import { DispatchFunc } from '../types';
import { PopupPosition } from '../Models/PopupPosition';
import { getColumn } from './ColumnUtils';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';
import { isTableAction } from './ActionUtils';
import { newRowId } from '../const';
import { replaceValue } from './DataUtils';

export const getNewRowEditableCells = (editableCells: EditableCell[]) => {
    return editableCells && editableCells.filter(c => c.rowKeyValue === newRowId)
};

export const getNewRowDataFromEditableCells = (editableCells: EditableCell[], columns: Column[]) => {
    return editableCells.reduce((acc, item) => {
        if (!Object.prototype.hasOwnProperty.call(item, 'editorValue')) return acc;
        const column = getColumn(columns, item.columnKey);
        return column ? replaceValue(acc, column, item.editorValue) : acc;
    }, {});
};

export const isEditableCell = (editingMode: EditingMode, column: Column, rowEditableCells: EditableCell[]): boolean => {
    if (column.isEditable !== undefined) {
        return column.isEditable;
    }
    return !!rowEditableCells.find((c) => c.columnKey === column.key);
};

export const getEditableCell = (column: Column, rowEditableCells: EditableCell[]): EditableCell | undefined => {
    if (column.isEditable === false) {
        return undefined;
    }
    return rowEditableCells.find((c) => c.columnKey === column.key);
};

export const addItemToEditableCells = (
    item: EditableCell, editableCells: EditableCell[]): EditableCell[] => {
    return getCopyOfArrayAndAddItem(item, editableCells);
};

export const getCellEditorDispatchHandler = (dispatch: DispatchFunc): DispatchFunc => {
    return (action) => {
        if (isTableAction(action) && action.type === ActionType.UpdateEditorValue) {
            dispatch(updateCellValue(action.rowKeyValue, action.columnKey, action.value));
        } else {
            dispatch(action);
        }
    }
};

export const removeItemFromEditableCells = (
    item: EditableCell, editableCells: EditableCell[]): EditableCell[] => {
    return editableCells.filter((c) => c.columnKey !== item.columnKey || c.rowKeyValue !== item.rowKeyValue);
};

export const checkPopupPosition = (
    column: Column,
    refToElement: React.MutableRefObject<HTMLDivElement | null>,
    dispatch: DispatchFunc,
) => {
    const element = refToElement.current;
    if (element && column.isHeaderFilterPopupShown) {
        const parent = element.offsetParent as HTMLElement | null;
        // there is no offsetParent while the table is hidden (display: none)
        if (!parent) {
            return;
        }
        const table = parent.closest('table') as HTMLElement;
        const kaWrapper = parent.closest('.ka-table-wrapper') as HTMLElement;
        const newPopupPosition: PopupPosition = {
            x: element.offsetLeft + parent?.offsetLeft - kaWrapper?.scrollLeft,
            y: element.offsetTop + table?.offsetTop + element.offsetHeight
        }
        if (newPopupPosition.x !== column.headerFilterPopupPosition?.x || newPopupPosition.y !== column.headerFilterPopupPosition?.y) {
            dispatch(updatePopupPosition(newPopupPosition));
        }
    }
}

import { updateCellValue, updatePopupPosition } from '../actionCreators';
import { ActionType, EditingMode } from '../enums';
import { Column, EditableCell } from '../models';
import { PopupPosition } from '../Models/PopupPosition';
import { DispatchFunc } from '../types';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

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

export const getCellEditorDispatchHandler = (dispatch: DispatchFunc) => {
  return (action: any) => {
    if (action.type === ActionType.UpdateEditorValue) {
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
  refToElement: React.MutableRefObject<HTMLDivElement>,
  dispatch: DispatchFunc,
) => {
  if (refToElement.current && column.isHeaderFilterPopupShown) {
    const newPopupPosition: PopupPosition = {
      x: refToElement.current.offsetLeft + (refToElement.current.offsetParent as HTMLElement)?.offsetLeft,
      y: refToElement.current.offsetTop + (refToElement.current.offsetParent as HTMLElement)?.offsetTop + refToElement.current.offsetHeight
    }
    if (newPopupPosition.x !== column.headerFilterPopupPosition?.x || newPopupPosition.y !== column.headerFilterPopupPosition?.y) {
      dispatch(updatePopupPosition(newPopupPosition));
    }
  }
}

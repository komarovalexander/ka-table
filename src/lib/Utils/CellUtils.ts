import { updateCellValue } from '../actionCreators';
import { ActionType } from '../enums';
import { Column, EditableCell } from '../models';
import { DispatchFunc } from '../types';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

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

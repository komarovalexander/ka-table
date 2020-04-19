import { EditingMode } from '../enums';
import { Column, EditableCell } from '../models';
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

export const removeItemFromEditableCells = (
  item: EditableCell, editableCells: EditableCell[]): EditableCell[] => {
    return editableCells.filter((c) => c.columnKey !== item.columnKey || c.rowKeyValue !== item.rowKeyValue);
};

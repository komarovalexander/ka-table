import { EditingMode } from '../enums';
import { Column } from '../models';
import { Cell } from '../Models/Cell';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

export const isEditableCell = (editingMode: EditingMode, column: Column, rowEditableCells: Cell[]): boolean => {
  if (column.isEditable !== undefined) {
    return column.isEditable;
  }
  return !!rowEditableCells.find((c) => c.columnKey === column.key);
};

export const getEditableCell = (column: Column, rowEditableCells: Cell[]): Cell | undefined => {
  if (column.isEditable === false) {
    return undefined;
  }
  return rowEditableCells.find((c) => c.columnKey === column.key);
};

export const addItemToEditableCells = (
  item: Cell, editableCells: Cell[]): Cell[] => {
    return getCopyOfArrayAndAddItem(item, editableCells);
};

export const removeItemFromEditableCells = (
  item: Cell, editableCells: Cell[]): Cell[] => {
    return editableCells.filter((c) => c.columnKey !== item.columnKey || c.rowKeyValue !== item.rowKeyValue);
};

import { EditingMode } from '../enums';
import { Column } from '../models';
import { Cell } from '../Models/Cell';
import { OptionChangedFunc } from '../types';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

export const isEditableCell = (editingMode: EditingMode, column: Column, rowEditableCells: Cell[]): boolean => {
  if (column.isEditable !== undefined) {
    return column.isEditable;
  }
  if (editingMode === EditingMode.Cell) {
    return !!rowEditableCells.find((c) => c.columnKey === column.key);
  }
  return false;
};

export const changeCellTextToCellEditorHandler = (
  item: Cell, editableCells: Cell[], onOptionChanged: OptionChangedFunc) => {
    const newEditableCells = getCopyOfArrayAndAddItem(item, editableCells);
    onOptionChanged({ editableCells: newEditableCells });
};

export const changeCellEditorToCellTextHandler = (
  item: Cell, editableCells: Cell[], onOptionChanged: OptionChangedFunc) => {
    const newEditableCells = editableCells.filter((c) => c.columnKey !== item.columnKey || c.rowKey !== item.rowKey);
    onOptionChanged({ editableCells: newEditableCells });
};

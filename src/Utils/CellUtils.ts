import { EditingMode } from '../Enums/EditingMode';
import { Cell } from '../Models/Cell';
import { OptionChangedFunc } from '../Types/OptionChangedFunc';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

export const isEditableCell = (editingMode: EditingMode, field: string, rowEditableCells?: Cell[]): boolean => {
  if (editingMode === EditingMode.Cell) {
    return rowEditableCells ? !!rowEditableCells.find((c) => c.field === field) : false;
  }
  return false;
};

export const changeCellTextToCellEditorHandler = (
  item: Cell, editableCells: Cell[] = [], onOptionChanged: OptionChangedFunc) => {
    const newEditableCells = getCopyOfArrayAndAddItem(item, editableCells);
    onOptionChanged({ editableCells: newEditableCells });
};

export const changeCellEditorToCellTextHandler = (
  item: Cell, editableCells: Cell[] = [], onOptionChanged: OptionChangedFunc) => {
    const newEditableCells = editableCells.filter((c) => c.field !== item.field && c.rowKeyValue !== item.rowKeyValue);
    onOptionChanged({ editableCells: newEditableCells });
};

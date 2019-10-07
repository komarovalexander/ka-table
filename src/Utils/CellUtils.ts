import { Cell } from '../Models/Cell';
import { OptionChangedFunc } from '../Types/OptionChangedFunc';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

export const isEditableCell = (field: string, rowEditableCells?: Cell[]): boolean => {
  return rowEditableCells ? !!rowEditableCells.find((c) => c.field === field) : false;
};

export const changeCellTextToCellEditorHandler = (item: Cell, editableCells: Cell[] = [], onOptionChanged: OptionChangedFunc) => {
  var newEditableCells = getCopyOfArrayAndAddItem(item, editableCells);
  onOptionChanged({ editableCells: newEditableCells });
}

export const changeCellEditorToCellTextHandler = (item: Cell, editableCells: Cell[] = [], onOptionChanged: OptionChangedFunc) => {  
  var newEditableCells = editableCells.filter(c => c.field !== item.field && c.rowKeyValue !== item.rowKeyValue);
  onOptionChanged({ editableCells: newEditableCells });
}

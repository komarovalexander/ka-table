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

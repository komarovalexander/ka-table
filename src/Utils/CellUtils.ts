import { EditingMode } from '../Enums/EditingMode';
import { Cell } from '../Models/Cell';
import { OptionChangedFunc } from '../Types/OptionChangedFunc';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';

export const isEditableCell = (editingMode: EditingMode, field: string, rowEditableCells: Cell[]): boolean => {
  if (editingMode === EditingMode.Cell) {
    return !!rowEditableCells.find((c) => c.field === field);
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
    const newEditableCells = editableCells.filter((c) => c.field !== item.field && c.rowKeyValue !== item.rowKeyValue);
    onOptionChanged({ editableCells: newEditableCells });
};

export const getValueFromInputEvent = (event: React.FormEvent<HTMLInputElement>) => {
  return event.currentTarget.type === 'checkbox' ? event.currentTarget.checked :
  (event.currentTarget.type === 'date' ? new Date(event.currentTarget.value) : event.currentTarget.value);
};

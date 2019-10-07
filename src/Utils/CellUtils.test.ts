import { EditingMode } from '../Enums/EditingMode';
import { isEditableCell } from './CellUtils';

describe('CellUtils', () => {
  it('isEditableCell equals true', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, 'column', [{
      field: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeTruthy();
  });

  it('isEditableCell equals false', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, 'column2', [{
      field: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });

  it('isEditableCell always equals false when EditingMode.None', () => {
    const rowEditableCells = isEditableCell(EditingMode.None, 'column', [{
      field: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });
});

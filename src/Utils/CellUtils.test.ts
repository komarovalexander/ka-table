import { isEditableCell } from './CellUtils';

describe('CellUtils', () => {
  it('isEditableCell equals true', () => {
    const rowEditableCells = isEditableCell('column', [{
      field: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeTruthy();
  });

  it('isEditableCell equals false', () => {
    const rowEditableCells = isEditableCell('column2', [{
      field: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });
});

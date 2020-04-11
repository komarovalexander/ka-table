import { EditingMode } from '../enums';
import { Cell } from '../Models/Cell';
import { addItemToEditableCells, isEditableCell, removeItemFromEditableCells } from './CellUtils';

describe('CellUtils', () => {
  it('isEditableCell equals true', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column' }, [{
      columnKey: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeTruthy();
  });

  it('isEditableCell equals false', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column2' }, [{
      columnKey: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });

  describe('CellHandlers', () => {
    it('addItemToEditableCells', () => {
      const editableCells: Cell[] = [{
        columnKey: 'column',
        rowKeyValue: 1,
      }];
      const item: Cell = {
        columnKey: 'column2',
        rowKeyValue: 2,
      };
      const newEditableCells = addItemToEditableCells(item, editableCells);
      expect(newEditableCells).toMatchSnapshot();
    });

    it('removeItemFromEditableCells', () => {
      const editableCells: Cell[] = [{
        columnKey: 'column',
        rowKeyValue: 1,
      }, {
        columnKey: 'column2',
        rowKeyValue: 2,
      }, {
        columnKey: 'column',
        rowKeyValue: 2,
      }];
      const item: Cell = {
        columnKey: 'column2',
        rowKeyValue: 2,
      };
      const newEditableCells = removeItemFromEditableCells(item, editableCells);
      expect(newEditableCells).toMatchSnapshot();
    });
  });
});

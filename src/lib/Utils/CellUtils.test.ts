import { EditingMode } from '../enums';
import { EditableCell } from '../models';
import {
  addItemToEditableCells, getEditableCell, isEditableCell, removeItemFromEditableCells,
} from './CellUtils';

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

  it('isEditableCell equals false if column.isEditable is false', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column', isEditable: false }, [{
      columnKey: 'column',
      rowKeyValue: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });

  it('getEditableCell return undefined if column.isEditable is false', () => {
    const editableCell = getEditableCell({ key: 'column', isEditable: false }, [{
      columnKey: 'column',
      rowKeyValue: 10,
    }]);
    expect(editableCell).toBeUndefined();
  });

  describe('CellHandlers', () => {
    it('addItemToEditableCells', () => {
      const editableCells: EditableCell[] = [{
        columnKey: 'column',
        rowKeyValue: 1,
      }];
      const item: EditableCell = {
        columnKey: 'column2',
        rowKeyValue: 2,
      };
      const newEditableCells = addItemToEditableCells(item, editableCells);
      expect(newEditableCells).toMatchSnapshot();
    });

    it('removeItemFromEditableCells', () => {
      const editableCells: EditableCell[] = [{
        columnKey: 'column',
        rowKeyValue: 1,
      }, {
        columnKey: 'column2',
        rowKeyValue: 2,
      }, {
        columnKey: 'column',
        rowKeyValue: 2,
      }];
      const item: EditableCell = {
        columnKey: 'column2',
        rowKeyValue: 2,
      };
      const newEditableCells = removeItemFromEditableCells(item, editableCells);
      expect(newEditableCells).toMatchSnapshot();
    });
  });
});

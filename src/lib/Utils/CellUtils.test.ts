import { EditingMode } from '../enums';
import { Cell } from '../Models/Cell';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler, isEditableCell,
} from './CellUtils';

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

  describe('CellHandlers', () => {
    it('changeCellTextToCellEditorHandler', () => {
      const onOptionChangedMock = jest.fn((x) => {});
      const editableCells: Cell[] = [{
        field: 'column',
        rowKeyValue: 1,
      }];
      const item: Cell = {
        field: 'column2',
        rowKeyValue: 2,
      };
      changeCellTextToCellEditorHandler(item, editableCells, onOptionChangedMock);
      expect(onOptionChangedMock.mock.calls.length).toBe(1);
      expect(onOptionChangedMock.mock.calls[0]).toMatchSnapshot();
    });

    it('changeCellEditorToCellTextHandler', () => {
      const onOptionChangedMock = jest.fn();
      const editableCells: Cell[] = [{
        field: 'column',
        rowKeyValue: 1,
      }, {
        field: 'column2',
        rowKeyValue: 2,
      }, {
        field: 'column',
        rowKeyValue: 2,
      }];
      const item: Cell = {
        field: 'column2',
        rowKeyValue: 2,
      };
      changeCellEditorToCellTextHandler(item, editableCells, onOptionChangedMock);
      expect(onOptionChangedMock.mock.calls.length).toBe(1);
      expect(onOptionChangedMock.mock.calls[0]).toMatchSnapshot();
    });
  });
});

import { EditingMode } from '../enums';
import { Cell } from '../Models/Cell';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler, isEditableCell,
} from './CellUtils';

describe('CellUtils', () => {
  it('isEditableCell equals true', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column' }, [{
      columnKey: 'column',
      rowKey: 10,
    }]);
    expect(rowEditableCells).toBeTruthy();
  });

  it('isEditableCell equals false', () => {
    const rowEditableCells = isEditableCell(EditingMode.Cell, { key: 'column2' }, [{
      columnKey: 'column',
      rowKey: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });

  it('isEditableCell always equals false when EditingMode.None', () => {
    const rowEditableCells = isEditableCell(EditingMode.None, { key: 'column' }, [{
      columnKey: 'column',
      rowKey: 10,
    }]);
    expect(rowEditableCells).toBeFalsy();
  });

  describe('CellHandlers', () => {
    it('changeCellTextToCellEditorHandler', () => {
      const onOptionChangedMock = jest.fn((x) => {});
      const editableCells: Cell[] = [{
        columnKey: 'column',
        rowKey: 1,
      }];
      const item: Cell = {
        columnKey: 'column2',
        rowKey: 2,
      };
      changeCellTextToCellEditorHandler(item, editableCells, onOptionChangedMock);
      expect(onOptionChangedMock.mock.calls.length).toBe(1);
      expect(onOptionChangedMock.mock.calls[0]).toMatchSnapshot();
    });

    it('changeCellEditorToCellTextHandler', () => {
      const onOptionChangedMock = jest.fn();
      const editableCells: Cell[] = [{
        columnKey: 'column',
        rowKey: 1,
      }, {
        columnKey: 'column2',
        rowKey: 2,
      }, {
        columnKey: 'column',
        rowKey: 2,
      }];
      const item: Cell = {
        columnKey: 'column2',
        rowKey: 2,
      };
      changeCellEditorToCellTextHandler(item, editableCells, onOptionChangedMock);
      expect(onOptionChangedMock.mock.calls.length).toBe(1);
      expect(onOptionChangedMock.mock.calls[0]).toMatchSnapshot();
    });
  });
});

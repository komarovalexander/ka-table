import { EditingMode } from '../Enums/EditingMode';
import { Cell } from '../Models/Cell';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler, getValueFromInputEvent,
  isEditableCell,
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

  describe('getValueFromInputEvent', () => {
    it('for string', () => {
      const event: any = {
        currentTarget: {
          type: 'text',
          value: 'strValue',
        },
      };
      const result = getValueFromInputEvent(event, null);
      expect(result).toBe('strValue');
    });

    it('for boolean', () => {
      const event: any = {
        currentTarget: {
          checked: true,
          type: 'checkbox',
        },
      };
      const result = getValueFromInputEvent(event, null);
      expect(result).toBe(true);
    });

    it('for date', () => {
      const date = new Date();
      const event: any = {
        currentTarget: {
          type: 'date',
          value: date.toISOString().split('T')[0],
        },
      };
      const result: any = getValueFromInputEvent(event);
      expect(result.getFullYear()).toEqual(date.getFullYear());
      expect(result.getMonth()).toEqual(date.getMonth());
      expect(result.getDay()).toEqual(date.getDay());
    });
  });

});

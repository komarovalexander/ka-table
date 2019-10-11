import { FilterRowItem } from '../Models/FilterRowItem';
import { filterCellValueChangeHandler, filterData, getRowEditableCells } from './FilterUtils';

describe('FilterUtils', () => {
  it('getRowEditableCells should return required cells from table EditableCells', () => {
    const rowEditableCells = getRowEditableCells(10, [{
      field: '10',
      rowKeyValue: 10,
    }, {
      field: '10',
      rowKeyValue: 2,
    }]);
    expect(rowEditableCells).toMatchSnapshot();
  });

  describe('filterData', () => {
    const data: any[] = [
      { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
      { id: 2, name: 'Billi Bob', score: 55, passed: false },
      { id: 3, name: 'Tom Williams', score: 45, passed: false },
      { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
      { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
      { id: 6, name: 'Sunny Fox', score: 33, passed: false },
    ];
    it('one item', () => {
      const filterRow = [{
        field: 'name',
        operator: '=',
        value: 'Billi Bob',
      }];
      const result = filterData(data, filterRow);
      expect(result).toMatchSnapshot();
    });

    it('two item', () => {
      const filterRow: FilterRowItem[] = [{
        field: 'name',
        operator: '=',
        value: 'Billi Bob',
      }, {
        field: 'score',
        operator: '=',
        value: 45,
      }];
      const result = filterData(data, filterRow);
      expect(result).toMatchSnapshot();
    });
  });

  describe('filterCellValueChangeHandler', () => {
    let filterRow: FilterRowItem[];
    beforeEach(() => {
      filterRow = [{
        field: 'name',
        operator: '=',
        value: 'Billi Bob',
      }, {
        field: 'score',
        operator: '=',
        value: 45,
      }];
    });
    it('repace item', () => {
      const field = 'name';
      const value = 'Sasha';
      const optionChangeHandler = jest.fn();
      filterCellValueChangeHandler(value, field, filterRow, optionChangeHandler);
      expect(optionChangeHandler.mock.calls.length).toBe(1);
      expect(optionChangeHandler.mock.calls[0]).toMatchSnapshot();
    });

    it('add item', () => {
      const field = 'position';
      const value = 'Professor';
      const optionChangeHandler = jest.fn();
      filterCellValueChangeHandler(value, field, filterRow, optionChangeHandler);
      expect(optionChangeHandler.mock.calls.length).toBe(1);
      expect(optionChangeHandler.mock.calls[0]).toMatchSnapshot();
    });

    it('delete item', () => {
      const field = 'name';
      const value = '';
      const optionChangeHandler = jest.fn();
      filterCellValueChangeHandler(value, field, filterRow, optionChangeHandler);
      expect(optionChangeHandler.mock.calls.length).toBe(1);
      expect(optionChangeHandler.mock.calls[0]).toMatchSnapshot();
    });
  });
});

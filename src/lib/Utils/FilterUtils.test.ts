import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { FilterRowItem } from '../Models/FilterRowItem';
import {
  filterCellValueChangeHandler, filterData, getRowEditableCells, searchData,
} from './FilterUtils';

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

  describe('searchData', () => {
    const columns: Column[] = [
      { field: 'name', title: 'Name', dataType: DataType.String, width: '40%' },
      { field: 'score', title: 'Score', dataType: DataType.Number, width: '10%' },
      {
        dataType: DataType.Boolean,
        field: 'passed',
        search: (searchText?: string, rowData?: any) => {
          return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
        },
        title: 'Passed',
      },
    ];
    const data: any[] = [
      { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
      { id: 2, name: 'Billi Bob', score: 55, passed: false },
      { id: 3, name: 'Tom Williams', score: 45, passed: false },
      { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
      { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
      { id: 6, name: 'Sunny Fox', score: 33, passed: false },
    ];
    it('by string', () => {
      const result = searchData(columns, data, 'Mike');
      expect(result).toMatchSnapshot();
    });

    it('by boolean', () => {
      const columnsBoolean: Column[] = [
        {
          dataType: DataType.Boolean,
          field: 'passed',
          title: 'Passed',
        },
      ];
      const result = searchData(columnsBoolean, data, 'tru');
      expect(result).toMatchSnapshot();
    });

    it('should not find value by search handler', () => {
      const result = searchData(columns, data, 'tru');
      expect(result).toMatchSnapshot();
    });

    it('should find value by search handler', () => {
      const result = searchData(columns, data, 'true');
      expect(result).toMatchSnapshot();
    });
  });
});

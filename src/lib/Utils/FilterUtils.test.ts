import { DataType } from '../enums';
import { Column } from '../Models/Column';
import {
  filterData, getDefaultOperatorForType, getRowEditableCells, predefinedFilterOperators, searchData,
} from './FilterUtils';

describe('FilterUtils', () => {
  it('getRowEditableCells should return required cells from table EditableCells', () => {
    const rowEditableCells = getRowEditableCells(10, [{
      columnKey: '10',
      rowKey: 10,
    }, {
      columnKey: '10',
      rowKey: 2,
    }]);
    expect(rowEditableCells).toMatchSnapshot();
  });

  it('getDefaultOperatorForType', () => {
    expect(getDefaultOperatorForType(DataType.Number)).toBe('=');
    expect(getDefaultOperatorForType(DataType.Object)).toBe('=');
    expect(getDefaultOperatorForType(DataType.String)).toBe('contains');
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
      const columns = [{
        filterRowValue: 'Billi Bob',
        key: 'name',
      }];
      const result = filterData(data, columns);
      expect(result).toMatchSnapshot();
    });

    it('two item', () => {
      const columns = [{
        filterRowValue: 'Billi Bob',
        key: 'name',
      }, {
        dataType: DataType.Number,
        filterRowValue: 45,
        key: 'score',
      }];
      const result = filterData(data, columns);
      expect(result).toMatchSnapshot();
    });

    it('should throw an error in case of unknown filterOperator', () => {
      const columns = [{
        filterRowOperator: 'unknownOperator',
        filterRowValue: 'Billi Bob',
        key: 'name',
      }];
      expect(() => filterData(data, columns)).toThrowError('\'unknownOperator\' has not found in predefinedFilterOperators array, available operators: =, >, <, >=, <=, contains');
    });
  });

  [{
    falsy: [1, 2],
    name: '=',
    truthy: [1, 1],
  }, {
    falsy: [1, 1],
    name: '>',
    truthy: [2, 1],
  }, {
    falsy: [2, 1],
    name: '<',
    truthy: [1, 2],
  }, {
    falsy: [1, 2],
    name: '>=',
    truthy: [1, 1],
  }, {
    falsy: [2, 1],
    name: '<=',
    truthy: [1, 1],
  }, {
    falsy: ['abs', 'ss'],
    name: 'contains',
    truthy: ['hello', 'hell'],
  }].forEach((d) => {
    it(`predefinedFilterOperators operator ${d.name} truthy: ${d.truthy} falsy: ${d.falsy}`, () => {
      const operator = predefinedFilterOperators.find((o) => o.name === d.name);
      if (!operator) {
        throw new Error(`${d.name} was not found`);
      }
      expect(operator.compare(d.truthy[0], d.truthy[1])).toBeTruthy();
      expect(operator.compare(d.falsy[0], d.falsy[1])).toBeFalsy();
    });
  });

  describe('searchData', () => {
    const columns: Column[] = [
      { key: 'name', title: 'Name', dataType: DataType.String },
      { key: 'score', title: 'Score', dataType: DataType.Number },
      {
        dataType: DataType.Boolean,
        key: 'passed',
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
          key: 'passed',
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

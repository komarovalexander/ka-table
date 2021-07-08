import { DataType, FilterOperatorName } from '../enums';
import { Column } from '../Models/Column';
import { SearchFunc } from '../types';
import {
  filterData, getDefaultOperatorForType, getRowEditableCells, predefinedFilterOperators, searchData,
} from './FilterUtils';

describe('FilterUtils', () => {
  it('getRowEditableCells should return required cells from table EditableCells', () => {
    const rowEditableCells = getRowEditableCells(10, [{
      columnKey: '10',
      rowKeyValue: 10,
    }, {
      columnKey: '10',
      rowKeyValue: 2,
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
      { id: 1, name: 'Mike Wazowski', score: 80, passed: true, date: new Date(Date.UTC(2021, 11, 20, 9)) },
      { id: 2, name: 'Billi Bob', score: 55, passed: false, date: new Date(Date.UTC(2021, 11, 20, 13)) },
      { id: 3, name: 'Tom Williams', score: 45, passed: false, date: new Date(Date.UTC(2021, 10, 20, 13)) },
      { id: 4, name: 'Kurt Cobain', score: 75, passed: true, date: new Date(Date.UTC(2021, 11, 19, 13)) },
      { id: 5, name: 'Marshall Bruce', score: 77, passed: true, date: null },
      { id: 6, name: 'Sunny Fox', score: 33, passed: false, date: new Date(Date.UTC(2021, 11, 17, 13)) },
    ];
    it('one item', () => {
      const columns = [{
        filterRowValue: 'Billi Bob',
        key: 'name',
      }];
      const result = filterData(data, columns);
      expect(result).toMatchSnapshot();
    });

    it('by date', () => {
      const columnsDate: Column[] = [
        {
          dataType: DataType.Date,
          filterRowValue: new Date(Date.UTC(2021, 11, 20, 19, 18, 12)),
          key: 'date',
        },
      ];
      const result = filterData(data, columnsDate);
      expect(result).toMatchSnapshot();
    });

    it('IsEmpty for date', () => {
      const columnsDate: Column[] = [
        {
          dataType: DataType.Date,
          filterRowOperator: FilterOperatorName.IsEmpty,
          key: 'date',
        },
      ];
      const result = filterData(data, columnsDate);
      expect(result).toMatchSnapshot();
    });

    it('IsNotEmpty for date', () => {
      const columnsDate: Column[] = [
        {
          dataType: DataType.Date,
          filterRowOperator: FilterOperatorName.IsNotEmpty,
          key: 'date',
        },
      ];
      const result = filterData(data, columnsDate);
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

    it('custom filter', () => {
      const columns = [{
        dataType: DataType.Number,
        filterRowValue: 45,
        key: 'score',
      }];
      const result = filterData(data, columns, ({ column }) => {
        if (column.key === 'score'){
          return (value, filterValue) => value !== filterValue;
        }
      });
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
  }, {
    falsy: [0, false],
    name: 'contains',
    truthy: [0, 0],
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

  [{
    name: '=',
    nullShouldPass: false,
    undefinedShouldPass: false,
    value: 1,
  }, {
    name: '>',
    nullShouldPass: false,
    undefinedShouldPass: false,
    value: 1,
  }, {
    name: '<',
    nullShouldPass: true,
    undefinedShouldPass: false,
    value: 1,
  }, {
    name: '>=',
    nullShouldPass: false,
    undefinedShouldPass: false,
    value: 1,
  }, {
    name: '<=',
    nullShouldPass: true,
    undefinedShouldPass: false,
    value: 1,
  }, {
    name: 'contains',
    nullShouldPass: false,
    undefinedShouldPass: false,
    value: 1,
  }].forEach((d) => {
    it(`predefinedFilterOperators check null and undefined for ${d.name} operator`, () => {
      const operator = predefinedFilterOperators.find((o) => o.name === d.name);
      if (!operator) {
        throw new Error(`${d.name} was not found`);
      }
      expect(operator.compare(null, 1)).toEqual(d.nullShouldPass);
      expect(operator.compare(undefined, 1)).toEqual(d.undefinedShouldPass);
    });
  });

  describe('searchData', () => {
    const search: SearchFunc = ({ searchText, rowData, column }) => {
      if (column.key === 'passed')
        return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
    };
    const columns: Column[] = [
      { key: 'name', title: 'Name', dataType: DataType.String },
      { key: 'score', title: 'Score', dataType: DataType.Number },
      {
        dataType: DataType.Boolean,
        key: 'passed',
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
      { id: 7, name: 'Falsey False', score: 33, passed: false },
    ];
    it('by string', () => {
      const result = searchData(columns, data, 'Mike', search);
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

    it('should add item only once', () => {
      const result = searchData(columns, data, 'false', search);
      expect(result).toMatchSnapshot();
    });

    it('should not find value by search handler', () => {
      const result = searchData(columns, data, 'tru', search);
      expect(result).toMatchSnapshot();
    });

    it('should find value by search handler', () => {
      const result = searchData(columns, data, 'true', search);
      expect(result).toMatchSnapshot();
    });
  });
});

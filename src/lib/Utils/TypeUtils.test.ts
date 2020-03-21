import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { convertToColumnTypes, isFunction } from './TypeUtils';

interface ITestOptions {
  sameObject?: boolean;
  sameType?: boolean;
}
type TestCase = (string | undefined | boolean | number | Date | ITestOptions)[];
class TestSettings {
  public cases!: TestCase[];
  public dataType!: DataType;
}

describe('TypeUtils', () => {
  const settings: TestSettings[] = [{
    cases: [
      ['empty', undefined, undefined],
      ['fromBoolean', true, true, {
        sameType: true,
      }],
      ['fromDate', Date.UTC(2019, 10, 8), true],
      ['fromNumber', 12, true],
      ['fromObject', {}, true],
      ['fromString', '12', true],
      ['fromString false', 'false', false],
      ['fromString true', 'true', true],
    ],
    dataType: DataType.Boolean,
  }, {
    cases: [
      ['empty', undefined, undefined],
      ['fromBoolean', true, 1],
      ['fromDate', Date.UTC(2019, 10, 8), 1573171200000, {
        sameType: true,
      }],
      ['fromNumber', 12, 12, {
        sameType: true,
      }],
      ['fromObject', {}, NaN],
      ['fromStringNumber', '12', 12],
      ['fromString', 'a', NaN],
    ],
    dataType: DataType.Number,
  }, {
    cases: [
      ['empty', undefined, undefined],
      ['fromBoolean', true, true],
      ['fromDate', Date.UTC(2019, 10, 8),  Date.UTC(2019, 10, 8)],
      ['fromNumber', 12, 12],
      ['fromObject', {}, {}, {
        sameObject: true,
        sameType: true,
      }],
      ['fromString', 'str', 'str'],
    ],
    dataType: DataType.Object,
  }, {
    cases: [
      ['empty', undefined, undefined],
      ['fromBoolean', true, 'true'],
      ['fromDate', Date.UTC(2019, 10, 8), '1573171200000'],
      ['fromNumber', 12, '12'],
      ['fromObject', {}, '[object Object]'],
      ['fromString', 'str', 'str', {
        sameType: true,
      }],
    ],
    dataType: DataType.String,
  }];
  settings.forEach((test) => {
    describe(test.dataType, () => {
      const columns: Column[] = [
        { key: 'columnField', title: 'Column Title', dataType: test.dataType },
      ];
      test.cases.forEach((testCase: TestCase) => {
        it('should convert from ' + testCase[0], () => {
          const data = [{ columnField: testCase[1] }];
          const newData = convertToColumnTypes(data, columns);
          const options: ITestOptions = testCase[3] as ITestOptions;
          if (options && options.sameObject) {
            expect(newData[0].columnField).toStrictEqual(testCase[2]);
          } else {
            expect(newData[0].columnField).toBe(testCase[2]);
          }
        });
      });
    });
  });

  it('isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(1)).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction([])).toBeFalsy();
  });
});

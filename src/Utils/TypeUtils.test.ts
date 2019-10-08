import { strictEqual } from 'assert';

import { DataType } from '../Enums/DataType';
import { Column } from '../Models/Column';
import { convertToColumnTypes } from './TypeUtils';

[{
  cases: [
    ['fromBoolean', true, true],
    ['fromDate', Date.UTC(2019, 10, 8), true],
    ['fromNumber', 12, true],
    ['fromObject', {}, true],
    ['fromString', '12', true],
  ],
  dataType: DataType.Boolean,
}, {
  cases: [
    ['fromBoolean', true, 1],
    ['fromDate', Date.UTC(2019, 10, 8), 1573171200000],
    ['fromNumber', 12, 12],
    ['fromObject', {}, NaN],
    ['fromStringNumber', '12', 12],
    ['fromString', 'a', NaN],
  ],
  dataType: DataType.Number,
}, {
  cases: [
    ['fromBoolean', true, true],
    ['fromDate', Date.UTC(2019, 10, 8),  Date.UTC(2019, 10, 8)],
    ['fromNumber', 12, 12],
    ['fromObject', {}, {}, true],
    ['fromString', 'str', 'str'],
  ],
  dataType: DataType.Object,
}, {
  cases: [
    ['fromBoolean', true, 'true'],
    ['fromDate', Date.UTC(2019, 10, 8), '1573171200000'],
    ['fromNumber', 12, '12'],
    ['fromObject', {}, '[object Object]'],
    ['fromString', 'str', 'str'],
  ],
  dataType: DataType.String,
}].forEach((test) => {
  describe('TypeUtils, ' + test.dataType, () => {
    const columns: Column[] = [
      { field: 'columnField', title: 'Column Title', dataType: test.dataType },
    ];
    test.cases.forEach((testCase) => {
      it('should convert from ' + testCase[0], () => {
        const data = [{ columnField: testCase[1] }];
        const newData = convertToColumnTypes(data, columns);
        if (testCase[3]) {
          expect(newData[0].columnField).toStrictEqual(testCase[2]);
        } else {
          expect(newData[0].columnField).toBe(testCase[2]);
        }
      });
    });
  });
});

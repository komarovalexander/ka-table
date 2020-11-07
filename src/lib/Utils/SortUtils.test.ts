import { DataType, SortDirection, SortingMode } from '../enums';
import { Column } from '../Models/Column';
import {
  isMultipleSorting, isRemoteSorting, isSortingEnabled, isTripleStateSorting, sortColumns, sortData,
} from './SortUtils';

const data: any[] = [
  { column: 1, id: 1 },
  { column: 3, id: 2 },
  { column: 2, id: 3 },
  { column: 3, id: 4 },
  { column: 3, id: 5 },
  { column: null, id: 5 },
  { column: null, id: 6 },
];

const columns: Column[] = [
  { key: 'id', title: 'Id', dataType: DataType.String },
  { key: 'column', title: 'Column 1', sortDirection: SortDirection.Descend, dataType: DataType.String },
];

describe('sortData', () => {
  it('should not change original data', () => {
    const newData = sortData(columns, data);
    expect(newData).not.toBe(data);
  });

  it('should be sorted by Descend', () => {
    const newData = sortData(columns, data);
    expect(newData).toMatchSnapshot();
  });

  it('should be sorted by Ascend', () => {
    const columns2 = [
      { key: 'column', title: 'Column 1', sortDirection: SortDirection.Ascend, dataType: DataType.String },
    ];
    const newData = sortData(columns2, data);
    expect(newData).toMatchSnapshot();
  });
});

it('isTripleStateSorting', () => {
  expect(isTripleStateSorting(SortingMode.None)).toBeFalsy();
  expect(isTripleStateSorting(SortingMode.Single)).toBeFalsy();
  expect(isTripleStateSorting(SortingMode.SingleTripleState)).toBeTruthy();
  expect(isTripleStateSorting(SortingMode.SingleRemote)).toBeFalsy();
  expect(isTripleStateSorting(SortingMode.SingleTripleStateRemote)).toBeTruthy();
  expect(isTripleStateSorting(SortingMode.MultipleTripleStateRemote)).toBeTruthy();
});

it('isMultipleSorting', () => {
  expect(isMultipleSorting(SortingMode.None)).toBeFalsy();
  expect(isMultipleSorting(SortingMode.Single)).toBeFalsy();
  expect(isMultipleSorting(SortingMode.SingleTripleState)).toBeFalsy();
  expect(isMultipleSorting(SortingMode.SingleRemote)).toBeFalsy();
  expect(isMultipleSorting(SortingMode.SingleTripleStateRemote)).toBeFalsy();
  expect(isMultipleSorting(SortingMode.MultipleTripleStateRemote)).toBeTruthy();
});

it('isRemoteSorting', () => {
  expect(isRemoteSorting(SortingMode.None)).toBeFalsy();
  expect(isRemoteSorting(SortingMode.Single)).toBeFalsy();
  expect(isRemoteSorting(SortingMode.SingleTripleState)).toBeFalsy();
  expect(isRemoteSorting(SortingMode.SingleRemote)).toBeTruthy();
  expect(isRemoteSorting(SortingMode.SingleTripleStateRemote)).toBeTruthy();
  expect(isRemoteSorting(SortingMode.MultipleTripleStateRemote)).toBeTruthy();
});

it('isSortingEnabled', () => {
  expect(isSortingEnabled(SortingMode.None)).toBeFalsy();
  expect(isSortingEnabled(SortingMode.Single)).toBeTruthy();
  expect(isSortingEnabled(SortingMode.SingleTripleState)).toBeTruthy();
  expect(isSortingEnabled(SortingMode.SingleRemote)).toBeTruthy();
  expect(isSortingEnabled(SortingMode.SingleTripleStateRemote)).toBeTruthy();
  expect(isSortingEnabled(SortingMode.MultipleTripleStateRemote)).toBeTruthy();
});

it('sortColumns', () => {
  const newData = sortColumns([{
    key: '1',
    sortDirection: SortDirection.Ascend,
    sortIndex: 1
  }, {
    key: '4',
    sortDirection: SortDirection.Descend,
  }, {
    key: '7',
    sortDirection: SortDirection.Descend,
  },  {
    key: '2',
    sortDirection: SortDirection.Descend,
    sortIndex: 2
  },  {
    key: '9',
    sortDirection: SortDirection.Descend,
    sortIndex: 9
  }, {
    key: '3',
    sortDirection: SortDirection.Descend,
    sortIndex: 3
  }, {
    key: '6',
  }, {
    key: '5',
  }]);
  expect(newData).toMatchSnapshot();
});

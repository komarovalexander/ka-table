import { DataType, SortDirection, SortingMode } from '../enums';
import { Column } from '../Models/Column';
import { isSortingEnabled, sortData } from './SortUtils';

const data: any[] = [
  { column: 1, id: 1 },
  { column: 3, id: 2 },
  { column: 2, id: 3 },
  { column: 3, id: 4 },
  { column: 3, id: 5 },
  { column: null, id: 5 },
];

const columns: Column[] = [
  { key: 'id', title: 'Id', dataType: DataType.String },
  { key: 'column', title: 'Column 1', dataType: DataType.String, sortDirection: SortDirection.Descend },
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


describe('isSortingEnabled', () => {
  it('default', () => {
    expect(isSortingEnabled(SortingMode.None)).toBeFalsy();
    expect(isSortingEnabled(SortingMode.Single)).toBeTruthy();
    expect(isSortingEnabled(SortingMode.SingleRemote)).toBeTruthy();
  });
});

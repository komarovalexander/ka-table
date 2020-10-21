import { DataType, SortDirection, SortingMode } from '../enums';
import { Column } from '../Models/Column';
import { getNextSortDirection, getSortedColumns } from './HeadRowUtils';

const columns: Column[] = [
  { key: 'id', title: 'Id', dataType: DataType.String, sortDirection: SortDirection.Descend },
  { key: 'column', title: 'Column 1', dataType: DataType.String, sortDirection: SortDirection.Ascend },
  { key: 'column2', dataType: DataType.String, title: 'Column 2' },
];

describe('sortUtilsClickHandler', () => {
  it('should not change original data', () => {
    const sortedColumns = getSortedColumns(columns, columns[0].key, SortingMode.None);
    expect(columns[0].sortDirection).toBe(SortDirection.Descend);
    expect(sortedColumns).not.toBe(columns);
    expect(sortedColumns[0]).not.toBe(columns[0]);
  });

  it('should change sortDirection to Ascend', () => {
    const sortedColumns = getSortedColumns(columns, columns[0].key, SortingMode.None);
    expect(sortedColumns[0].sortDirection).toBe(SortDirection.Ascend);
  });

  it('should change sortDirection to Descend', () => {
    const sortedColumns = getSortedColumns(columns, columns[1].key, SortingMode.None);
    expect(sortedColumns[1].sortDirection).toBe(SortDirection.Descend);
  });

  it('should change default sortDirection to Ascend', () => {
    const sortedColumns = getSortedColumns(columns, columns[2].key, SortingMode.None);
    expect(sortedColumns[2].sortDirection).toBe(SortDirection.Ascend);
  });

  it('should not clear sortDirection in case of multiple', () => {
    const sortedColumns = getSortedColumns(columns, columns[2].key, SortingMode.MultipleRemote);
    expect(sortedColumns[0].sortDirection).toBe(SortDirection.Descend);
    expect(sortedColumns[1].sortDirection).toBe(SortDirection.Ascend);
    expect(sortedColumns[2].sortDirection).toBe(SortDirection.Ascend);
  });

  it('should set undefined sortDirection in case of multiple', () => {
    const sortedColumns = getSortedColumns(columns, columns[0].key, SortingMode.MultipleRemote);
    expect(sortedColumns[0].sortDirection).toBeUndefined();
    expect(sortedColumns[1].sortDirection).toBe(SortDirection.Ascend);
    expect(sortedColumns[2].sortDirection).toBeUndefined();
  });

  it('should set undefined sortDirection in case of SingleWithEmpty', () => {
    const sortedColumns = getSortedColumns(columns, columns[0].key, SortingMode.SingleWithEmpty);
    expect(sortedColumns[0].sortDirection).toBeUndefined();
    expect(sortedColumns[1].sortDirection).toBeUndefined();
    expect(sortedColumns[2].sortDirection).toBeUndefined();
  });

  describe('getColumnWithUpdatedSortDirection', () => {
    it('Descend -> Ascend', () => {
      const sortDirection = getNextSortDirection(SortDirection.Descend);
      expect(sortDirection).toBe(SortDirection.Ascend);
    });
    it('Ascend -> Descend', () => {
      const sortDirection = getNextSortDirection(SortDirection.Ascend);
      expect(sortDirection).toBe(SortDirection.Descend);
    });
    it('? -> Ascend', () => {
      const sortDirection = getNextSortDirection();
      expect(sortDirection).toBe(SortDirection.Ascend);
    });
  });
});

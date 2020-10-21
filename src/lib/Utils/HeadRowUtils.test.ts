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
    const column = {...columns[0]};
    column.sortDirection = SortDirection.Descend;
    const sortedColumns = getSortedColumns(columns, column.key, SortingMode.None);
    expect(columns[0].sortDirection).toBe(SortDirection.Descend);
    expect(sortedColumns).not.toBe(columns);
    expect(sortedColumns[0]).not.toBe(columns[0]);
  });

  it('should change sortDirection to Ascend', () => {
    const column = {...columns[0]};
    column.sortDirection = SortDirection.Ascend;
    const sortedColumns = getSortedColumns(columns, column.key, SortingMode.None);
    expect(sortedColumns[0].sortDirection).toBe(SortDirection.Ascend);
  });

  it('should change sortDirection to Descend', () => {
    const column = {...columns[1]};
    column.sortDirection = SortDirection.Descend;
    const sortedColumns = getSortedColumns(columns, column.key, SortingMode.None);
    expect(sortedColumns[1].sortDirection).toBe(SortDirection.Descend);
  });

  it('should change default sortDirection to Ascend', () => {
    const column = {...columns[2]};
    column.sortDirection = SortDirection.Ascend;
    const sortedColumns = getSortedColumns(columns, column.key, SortingMode.None);
    expect(sortedColumns[2].sortDirection).toBe(SortDirection.Ascend);
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

import { DataType, SortDirection } from '../enums';
import { Column } from '../Models/Column';
import { getColumnWithUpdatedSortDirection, getSortedColumns } from './HeadRowUtils';

const columns: Column[] = [
  { field: 'id', title: 'Id', dataType: DataType.String, sortDirection: SortDirection.Descend },
  { field: 'column', title: 'Column 1', dataType: DataType.String, sortDirection: SortDirection.Ascend },
  { field: 'column2', dataType: DataType.String, title: 'Column 2' },
];

describe('sortUtilsClickHandler', () => {
  it('should not change original data', () => {
    const column = {...columns[0]};
    column.sortDirection = SortDirection.Descend;
    const sortedColumns = getSortedColumns(columns, column);
    expect(columns[0].sortDirection).toBe(SortDirection.Descend);
    expect(sortedColumns).not.toBe(columns);
  });

  it('should change sortDirection to Ascend', () => {
    const column = {...columns[0]};
    column.sortDirection = SortDirection.Ascend;
    const sortedColumns = getSortedColumns(columns, column);
    expect(sortedColumns[0].sortDirection).toBe(SortDirection.Ascend);
  });

  it('should change sortDirection to Descend', () => {
    const column = {...columns[1]};
    column.sortDirection = SortDirection.Descend;
    const sortedColumns = getSortedColumns(columns, column);
    expect(sortedColumns[1].sortDirection).toBe(SortDirection.Descend);
  });

  it('should change default sortDirection to Ascend', () => {
    const column = {...columns[2]};
    column.sortDirection = SortDirection.Ascend;
    const sortedColumns = getSortedColumns(columns, column);
    expect(sortedColumns[2].sortDirection).toBe(SortDirection.Ascend);
  });

  it('getColumnWithUpdatedSortDirection', () => {
    const column = columns[0];
    const newColumn = getColumnWithUpdatedSortDirection(column);
    expect(column).not.toBe(newColumn);
    expect(column.sortDirection).toBe(SortDirection.Descend);
    expect(newColumn.sortDirection).toBe(SortDirection.Ascend);
  });
});

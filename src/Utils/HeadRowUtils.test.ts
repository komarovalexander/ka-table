import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { sortUtilsClickHandler } from './HeadRowUtils';

const columns: Column[] = [
  { field: 'id', title: 'Id', sortDirection: SortDirection.Descend },
  { field: 'column', title: 'Column 1' },
  { field: 'column2', title: 'Column 2' },
];

describe('sortUtilsClickHandler', () => {
  it('should not change original data', () => {
    sortUtilsClickHandler(columns, columns[0], (value) => {
      expect(columns[0].sortDirection).toBe(SortDirection.Descend);
      expect(value.columns).not.toBe(columns);
    });
  });

  it('should change sortDirection', () => {
    sortUtilsClickHandler(columns, columns[0], (value) => {
      expect(value.columns[0].sortDirection).toBe(SortDirection.Ascend);
    });
  });
});

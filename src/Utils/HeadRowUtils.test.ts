import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { sortUtilsClickHandler } from './HeadRowUtils';

const columns: Column[] = [
  { field: 'id', title: 'Id', sortDirection: SortDirection.Descend },
  { field: 'column', title: 'Column 1', sortDirection: SortDirection.Ascend },
  { field: 'column2', title: 'Column 2' },
];

describe('sortUtilsClickHandler', () => {
  it('should not change original data', () => {
    sortUtilsClickHandler(columns, columns[0], (value) => {
      expect(columns[0].sortDirection).toBe(SortDirection.Descend);
      expect(value.columns).not.toBe(columns);
    });
  });

  it('should change sortDirection to Ascend', () => {
    sortUtilsClickHandler(columns, columns[0], (value) => {
      expect(value.columns[0].sortDirection).toBe(SortDirection.Ascend);
    });
  });

  it('should change sortDirection to Descend', () => {
    sortUtilsClickHandler(columns, columns[1], (value) => {
      expect(value.columns[1].sortDirection).toBe(SortDirection.Descend);
    });
  });

  it('should change default sortDirection to Ascend', () => {
    sortUtilsClickHandler(columns, columns[2], (value) => {
      expect(value.columns[2].sortDirection).toBe(SortDirection.Ascend);
    });
  });
});

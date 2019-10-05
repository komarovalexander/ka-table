import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { OptionChangedParam } from '../Models/EventParams/OptionChangedParam';
import { sortUtilsClickHandler } from './HeadRowUtils';

const columns: Column[] = [
  { key: 'id', name: 'Id', sortDirection: SortDirection.Descend },
  { key: 'column', name: 'Column 1' },
  { key: 'column2', name: 'Column 2' },
];

describe('sortUtilsClickHandler', () => {
  it('should not change original data', () => {
    sortUtilsClickHandler(columns, columns[0], (newOption) => {
      expect(columns[0].sortDirection).toBe(SortDirection.Descend);
      expect(newOption).not.toBe(columns);
    });
  });

  it('should change sortDirection', () => {
    sortUtilsClickHandler(columns, columns[0], (newOption: OptionChangedParam) => {
      expect(newOption.value.columns[0].sortDirection).toBe(SortDirection.Ascend);
    });
  });
});

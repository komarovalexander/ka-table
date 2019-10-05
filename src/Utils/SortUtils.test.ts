import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { sortData } from './SortUtils';

const data: any[] = [];

for (let index = 0; index < 3; index++) {
  data.push({ column: index + '1', column2: index + '2', id: index });
}

const columns: Column[] = [
  { field: 'id', title: 'Id', sortDirection: SortDirection.Descend },
  { field: 'column', title: 'Column 1' },
  { field: 'column2', title: 'Column 2' },
];

describe('sortData', () => {
  it('should not change original data', () => {
    const newData = sortData(columns, data);
    expect(newData).not.toBe(data);
  });

  it('should be sorted', () => {
    const newData = sortData(columns, data);
    expect(newData).toMatchSnapshot();
  });
});

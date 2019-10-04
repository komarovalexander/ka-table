import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { sortData } from './SortUtils';

const data: any[] = [];

for (let index = 0; index < 3; index++) {
  data.push({ column: index + '1', column2: index + '2', id: index });
}

const columns: Column[] = [
  { key: 'id', name: 'Id', sortDirection: SortDirection.Descend },
  { key: 'column', name: 'Column 1' },
  { key: 'column2', name: 'Column 2' },
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

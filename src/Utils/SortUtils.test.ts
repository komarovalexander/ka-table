import { DataType } from '../Enums/DataType';
import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { sortData } from './SortUtils';

const data: any[] = [
  { column: 1, id: 1 },
  { column: 3, id: 2 },
  { column: 2, id: 3 },
  { column: 3, id: 4 },
  { column: 3, id: 5 },
];

const columns: Column[] = [
  { field: 'id', title: 'Id', dataType: DataType.String },
  { field: 'column', title: 'Column 1', dataType: DataType.String, sortDirection: SortDirection.Descend },
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
      { field: 'column', title: 'Column 1', sortDirection: SortDirection.Ascend, dataType: DataType.String },
    ];
    const newData = sortData(columns2, data);
    expect(newData).toMatchSnapshot();
  });
});

import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';

export const sortData = (columns: Column[], data: any): any[] => {
  const sortedColumn = columns.find((column) => column.sortDirection);
  if (!sortedColumn) { return data; }
  const columnKey = sortedColumn.key;
  const newData = [...data].sort((a: any, b: any) =>
  (sortedColumn.sortDirection === SortDirection.Ascend
    ? a[columnKey] > b[columnKey] : a[columnKey] < b[columnKey]) ? -1 : 1);
  return newData;
};

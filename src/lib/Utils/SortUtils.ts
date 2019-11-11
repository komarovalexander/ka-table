import { SortDirection } from '../enums';
import { Column } from '../Models/Column';

export const sortData = (columns: Column[], data: any): any[] => {
  const sortedColumn = columns.find((column) => column.sortDirection);
  if (!sortedColumn) { return data; }
  const columnKey = sortedColumn.field;
  const sortFunc = sortedColumn.sortDirection === SortDirection.Ascend ?
    ((a: any, b: any) => a[columnKey] < b[columnKey] ? -1 : 1)
    : ((a: any, b: any) => a[columnKey] > b[columnKey] ? -1 : 1);
  const newData = [...data].sort(sortFunc);
  return newData;
};

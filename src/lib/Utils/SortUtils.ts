import { SortDirection } from '../enums';
import { Column } from '../Models/Column';
import { getValueByColumn } from './DataUtils';

export const sortData = (columns: Column[], data: any): any[] => {
  const sortedColumn = columns.find((column) => column.sortDirection);
  if (!sortedColumn) { return data; }
  const sortFunc = sortedColumn.sortDirection === SortDirection.Ascend ?
    ((a: any, b: any) => getValueByColumn(a, sortedColumn) < getValueByColumn(b, sortedColumn) ? -1 : 1)
    : ((a: any, b: any) => getValueByColumn(a, sortedColumn) > getValueByColumn(b, sortedColumn) ? -1 : 1);
  const newData = [...data].sort(sortFunc);
  return newData;
};

import defaultOptions from '../defaultOptions';
import { SortDirection } from '../enums';
import { Column } from '../Models/Column';
import { compareColumns } from './ColumnUtils';

export const getSortedColumns = (
  columns: Column[],
  column: Column,
) => {
  const index = columns.findIndex((c) => compareColumns(c, column));
  const newColumns = [...columns];

  newColumns.forEach((c, newColumnIndex) => {
    if (c.sortDirection) {
      newColumns[newColumnIndex] = {...c};
      newColumns[newColumnIndex].sortDirection = undefined;
    }
  });

  newColumns[index] = {...column};
  return newColumns;
};

export const getColumnWithUpdatedSortDirection = (column: Column): Column => {
  const newColumn = {...column};
  newColumn.sortDirection = getNextSortDirection(newColumn.sortDirection);
  return newColumn;
};

const getNextSortDirection = (previousSortdirection?: SortDirection) => {
  let nextSortDirection;
  if (previousSortdirection) {
    nextSortDirection = previousSortdirection === SortDirection.Ascend
      ? SortDirection.Descend : SortDirection.Ascend;
  } else {
    nextSortDirection = defaultOptions.columnSortDirection;
  }
  return nextSortDirection;
};

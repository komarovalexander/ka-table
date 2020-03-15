import defaultOptions from '../defaultOptions';
import { SortDirection } from '../enums';
import { Column } from '../Models/Column';

export const getSortedColumns = (
  columns: Column[],
  columnKey: string,
) => {
  const index = columns.findIndex((c) => c.key === columnKey);
  const newColumns = [...columns];

  newColumns.forEach((c, newColumnIndex) => {
    if (index === newColumnIndex) {
      newColumns[index] = getColumnWithUpdatedSortDirection(newColumns[index]);
    } else if (c.sortDirection) {
      newColumns[newColumnIndex] = {...c};
      newColumns[newColumnIndex].sortDirection = undefined;
    }
  });
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

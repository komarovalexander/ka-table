import defaultOptions from '../defaultOptions';
import { SortDirection, SortingMode } from '../enums';
import { Column } from '../Models/Column';
import { canBeEmptySorting, isMultipleSorting } from './SortUtils';

export const getSortedColumns = (
  columns: Column[],
  columnKey: string,
  sortingMode: SortingMode,
) => {
  const newColumns = columns.map(c => ({...c}));
  const curentColumn = newColumns.find((c) => c.key === columnKey);
  if (curentColumn){
    let nextSortDirection = getNextSortDirection(curentColumn.sortDirection);
    if (canBeEmptySorting(sortingMode)
      && curentColumn.sortDirection
      && nextSortDirection === defaultOptions.columnSortDirection) {
      nextSortDirection = undefined as any;
    }
    if (!isMultipleSorting(sortingMode)) {
      newColumns.forEach(c => c.sortDirection = undefined);
    }
    curentColumn.sortDirection = nextSortDirection;
  }
  return newColumns;
};

export const getNextSortDirection = (
  previousSortdirection?: SortDirection): SortDirection => {
  let nextSortDirection;
  if (previousSortdirection) {
    nextSortDirection = previousSortdirection === SortDirection.Ascend
      ? SortDirection.Descend : SortDirection.Ascend;
  } else {
    nextSortDirection = defaultOptions.columnSortDirection;
  }
  return nextSortDirection;
};

import { SortDirection, SortingMode } from '../enums';
import { isMultipleSorting, isSortingEnabled, isTripleStateSorting, sortColumns } from './SortUtils';

import { Column } from '../Models/Column';
import defaultOptions from '../defaultOptions';

export const getHeadCellClassName = (sortingMode: SortingMode, isGrouped?: boolean) => `${defaultOptions.css.theadCell} ${defaultOptions.css.theadCellHeight} ${defaultOptions.css.theadFixed} ${defaultOptions.css.theadBackground} ${isSortingEnabled(sortingMode) ? 'ka-pointer' : ''} ${isGrouped ? 'ka-thead-grouped-cell' : ''}`

export const getUpdatedSortedColumns = (
  columns: Column[],
  columnKey: string,
  sortingMode: SortingMode,
) => {
  const newColumns = columns.map(c => ({...c}));
  const curentColumn = newColumns.find((c) => c.key === columnKey);
  if (curentColumn){
    let nextSortDirection = getNextSortDirection(curentColumn.sortDirection);
    if (isTripleStateSorting(sortingMode)
      && curentColumn.sortDirection
      && nextSortDirection === defaultOptions.columnSortDirection) {
      nextSortDirection = undefined as any;
    }
    if (!isMultipleSorting(sortingMode)) {
      newColumns.forEach(c => {
        delete c.sortDirection;
        delete c.sortIndex;
      });
    }

    if (nextSortDirection){
      curentColumn.sortDirection = nextSortDirection;

      if (isMultipleSorting(sortingMode) && !curentColumn.sortIndex) {
        const sortedColumns = newColumns.filter(c => c.sortDirection);
        curentColumn.sortIndex = sortedColumns.length + 1;
      }
    } else {
      delete curentColumn.sortDirection;
      delete curentColumn.sortIndex;
    }

    if (isMultipleSorting(sortingMode)) {
      const sortedColumns = sortColumns(newColumns);
      sortedColumns.forEach((c, i) => {
        c.sortIndex = i + 1;
      });
    }
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

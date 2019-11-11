import defaultOptions from '../defaultOptions';
import { SortDirection } from '../enums';
import { Column } from '../Models/Column';
import { OptionChangedFunc } from '../types';

export const sortUtilsClickHandler = (
  columns: Column[],
  column: Column,
  onOptionChanged: OptionChangedFunc,
) => {
  const index = columns.findIndex((c) => c === column);
  const newColumns = [...columns];
  const sortDirection = getNextSortDirection(column.sortDirection);

  newColumns.forEach((newColumn, newColumnIndex) => {
    if (newColumn.sortDirection) {
      newColumns[newColumnIndex] = {...newColumn};
      newColumns[newColumnIndex].sortDirection = undefined;
    }
  });

  newColumns[index] = {...column};
  newColumns[index].sortDirection = sortDirection;
  onOptionChanged({ columns: newColumns });
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

import { SortDirection } from '../Enums/SortDirection';
import { Column } from '../Models/Column';
import { DefaultOptions } from '../Models/DefaultOptions';
import { OptionChangedFunc } from '../Types/OptionChangedFunc';

export const sortUtilsClickHandler = (
  columns: Column[],
  column: Column,
  onOptionChanged: OptionChangedFunc,
) => {
  const index = columns.findIndex((c) => c === column);
  const newColumns = [...columns];
  const sortDirection = column.sortDirection === SortDirection.Ascend
  ? SortDirection.Descend : SortDirection.Ascend;

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

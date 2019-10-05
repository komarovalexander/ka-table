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
    let sortDirection;
    if (column.sortDirection) {
      sortDirection = column.sortDirection === SortDirection.Ascend
        ? SortDirection.Descend : SortDirection.Ascend;
    } else {
      sortDirection = DefaultOptions.columnSortDirection;
    }
    newColumns.forEach((newColumn, newColumnIndex) => {
      if (newColumn.sortDirection) {
        newColumns[newColumnIndex] = {...newColumn};
        newColumns[newColumnIndex].sortDirection = undefined;
      }
    });

    newColumns[index] = {...column};
    newColumns[index].sortDirection = sortDirection;
    onOptionChanged({
    name: 'columns',
    value: { columns: newColumns },
  });
};

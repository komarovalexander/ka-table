import { SortDirection, SortingMode } from '../enums';
import { Column } from '../Models/Column';
import { getValueByColumn } from './DataUtils';

export const sortColumns = (columns: Column[]) => {
  return columns.filter(c => c.sortDirection).sort((a, b) => {
    if (a.sortIndex === b.sortIndex){
      return 0;
    }
    if (!a.sortIndex){
      return -1;
    }
    if (!b.sortIndex){
      return 1;
    }
    if (a.sortIndex < b.sortIndex){
      return -1;
    }
    return 1;
  });
}

export const sortData = (columns: Column[], data: any): any[] => {
  const sortedColumn = columns.find((column) => column.sortDirection);
  if (!sortedColumn) { return data; }
  const sortFunc = sortedColumn.sortDirection === SortDirection.Ascend
    ? ascendSort(sortedColumn) : descendSort(sortedColumn);
  const newData = [...data].sort(sortFunc);
  return newData;
};

export const ascendSort = (sortedColumn: Column) => {
  return (a: any, b: any) => {
    const aValue = getValueByColumn(a, sortedColumn);
    const bValue = getValueByColumn(b, sortedColumn);
    if (aValue === bValue) {
        return 0;
    } else if (aValue == null) {
        return -1;
    } else if (bValue == null) {
        return 1;
    }
    return aValue < bValue ? -1 : 1;
  };
};

export const descendSort = (sortedColumn: Column) => {
  return (a: any, b: any) => {
    const aValue = getValueByColumn(a, sortedColumn);
    const bValue = getValueByColumn(b, sortedColumn);
    if (aValue === bValue) {
        return 0;
    } else if (aValue == null) {
        return 1;
    } else if (bValue == null) {
        return -1;
    }
    return aValue > bValue ? -1 : 1;
  };
};

export const canBeEmptySorting = (sortingMode: SortingMode) =>
  isMultipleSorting(sortingMode)
  || sortingMode === SortingMode.Single3State
  || sortingMode === SortingMode.Single3StateRemote;

export const isMultipleSorting = (sortingMode: SortingMode) =>
  sortingMode === SortingMode.MultipleRemote;

export const isRemoteSorting =  (sortingMode: SortingMode) =>
  sortingMode === SortingMode.SingleRemote || sortingMode === SortingMode.MultipleRemote || sortingMode === SortingMode.Single3StateRemote;

export const isSortingEnabled = (sortingMode: SortingMode) =>
  sortingMode !== SortingMode.None;

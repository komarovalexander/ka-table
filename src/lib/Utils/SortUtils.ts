import { SortDirection, SortingMode } from '../enums';
import { Column } from '../Models/Column';
import { SortFunc } from '../types';
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

export const sortData = (columns: Column[], data: any, sort?: SortFunc): any[] => {
  const column = columns.find((c) => c.sortDirection);
  if (!column) { return data; }
  const customSort = sort && sort({ column });
  const sortFunc = (
      customSort && ((rowDataA: any, rowDataB: any) => customSort(getValueByColumn(rowDataA, column), getValueByColumn(rowDataB, column)))
    ) || (
      column.sortDirection === SortDirection.Ascend
        ? ascendSort(column)
        : descendSort(column)
    );
  const newData = [...data].sort(sortFunc);
  return newData;
};

const ascendSort = (sortedColumn: Column) => {
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

const descendSort = (sortedColumn: Column) => {
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

export const isTripleStateSorting = (sortingMode: SortingMode) =>
  sortingMode === SortingMode.MultipleTripleStateRemote
  || sortingMode === SortingMode.SingleTripleState
  || sortingMode === SortingMode.SingleTripleStateRemote;

export const isMultipleSorting = (sortingMode: SortingMode) =>
  sortingMode === SortingMode.MultipleTripleStateRemote
  || sortingMode === SortingMode.MultipleRemote;

export const isRemoteSorting =  (sortingMode: SortingMode) =>
  sortingMode === SortingMode.SingleRemote
  || sortingMode === SortingMode.MultipleTripleStateRemote
  || sortingMode === SortingMode.SingleTripleStateRemote
  || sortingMode === SortingMode.MultipleRemote;

export const isSortingEnabled = (sortingMode: SortingMode) =>
  sortingMode !== SortingMode.None;

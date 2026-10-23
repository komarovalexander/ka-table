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

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the rows of data typed as any stay any, as before
export const sortData = <TData = any>(columns: Column[], data: TData[], sort?: SortFunc): TData[] => {
    const column = columns.find((c) => c.sortDirection);
    if (!column) { return data; }
    const customSort = sort && sort({ column });
    const sortFunc = (
        customSort && ((rowDataA: TData, rowDataB: TData) => customSort(getValueByColumn(rowDataA, column), getValueByColumn(rowDataB, column)))
    ) || (
        column.sortDirection === SortDirection.Ascend
            ? ascendSort(column)
            : descendSort(column)
    );
    const newData = [...data].sort(sortFunc);
    return newData;
};

const ascendSort = (sortedColumn: Column) => {
    return (a: unknown, b: unknown) => {
        const aValue = getValueByColumn(a, sortedColumn);
        const bValue = getValueByColumn(b, sortedColumn);
        if (aValue === bValue) {
            return 0;
        } else if (aValue == null) {
            return -1;
        } else if (bValue == null) {
            return 1;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string'){
            return aValue.toLowerCase() < bValue.toLowerCase() ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
    };
};

const descendSort = (sortedColumn: Column) => {
    return (a: unknown, b: unknown) => {
        const aValue = getValueByColumn(a, sortedColumn);
        const bValue = getValueByColumn(b, sortedColumn);
        if (aValue === bValue) {
            return 0;
        } else if (aValue == null) {
            return 1;
        } else if (bValue == null) {
            return -1;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string'){
            return aValue.toLowerCase() > bValue.toLowerCase() ? -1 : 1;
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

export const isSortingEnabled = (sortingMode: SortingMode, column?: Column) =>
    sortingMode !== SortingMode.None && column?.isSortable !== false;

// aria-sort is set only for the sorted columns, sortable columns are recognized by their buttons
export const getAriaSort = (sortingMode: SortingMode, column: Column): 'ascending' | 'descending' | undefined => {
    if (!isSortingEnabled(sortingMode, column) || !column.sortDirection) {
        return undefined;
    }
    return column.sortDirection === SortDirection.Ascend ? 'ascending' : 'descending';
};

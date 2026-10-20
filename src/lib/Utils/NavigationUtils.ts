import { getGroupedAndVisibleColumns, groupMark, groupSummaryMark } from './GroupUtils';
import { treeDataMark, treeGroupMark } from './TreeUtils';

import { Cell } from '../Models/Cell';
import { Column } from '../Models/Column';
import { ITableProps } from '../Components/Table/Table';
import { getData } from './PropsUtils';
import { getValueByField } from './DataUtils';

export interface IMoveFocusedSettings {
    end?: boolean
}

const hasCells = (row: any) => row.groupMark !== groupMark && row.groupSummaryMark !== groupSummaryMark;

/**
 * The key of a row with cells (a tree row is unwrapped), undefined for group rows and group summary rows
 */
export const getRowKeyValue = (row: any, rowKeyField: string): any => (
    hasCells(row)
        ? getValueByField(row.treeGroupMark === treeGroupMark || row.treeDataMark === treeDataMark ? row.rowData : row, rowKeyField)
        : undefined
);

/**
 * The keys of the rows which have cells: group rows and group summary rows are skipped
 */
export const getRowKeyValues = (data: any[], rowKeyField: string): any[] => data
    .filter(hasCells)
    .map((row) => getRowKeyValue(row, rowKeyField));

/**
 * The next item: one item forward or back, or the last or the first item (end).
 * A missing item goes to the first one forward and stays back
 */
const getNextItem = (items: any[], current: any, step: 1 | -1, end?: boolean) => {
    if (end) {
        const endItem = step > 0 ? items[items.length - 1] : items[0];
        return endItem === undefined ? current : endItem;
    }
    const index = items.indexOf(current);
    if (index === -1 && step < 0) {
        return current;
    }
    const nextItem = items[index + step];
    return nextItem === undefined ? current : nextItem;
};

export const getNextColumnKey = (columns: Column[], columnKey: string, step: 1 | -1, end?: boolean): string =>
    getNextItem(columns.map((c) => c.key), columnKey, step, end);

export const getNextRowKeyValue = (rowKeyValues: any[], rowKeyValue: any, step: 1 | -1, end?: boolean): any =>
    getNextItem(rowKeyValues, rowKeyValue, step, end);

// the columns of the cells: hidden and grouped columns are not shown
const getCellColumns = (props: ITableProps) => getGroupedAndVisibleColumns(props.columns, props.groups).columns;
// the rows of the current page
const getPageRowKeyValues = (props: ITableProps) => getRowKeyValues(getData(props), props.rowKeyField);

export const getRightCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings): Cell => ({
    columnKey: getNextColumnKey(getCellColumns(props), currentCell.columnKey, 1, settings?.end),
    rowKeyValue: currentCell.rowKeyValue,
});

export const getLeftCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings): Cell => ({
    columnKey: getNextColumnKey(getCellColumns(props), currentCell.columnKey, -1, settings?.end),
    rowKeyValue: currentCell.rowKeyValue,
});

export const getUpCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings): Cell => ({
    columnKey: currentCell.columnKey,
    rowKeyValue: getNextRowKeyValue(getPageRowKeyValues(props), currentCell.rowKeyValue, -1, settings?.end),
});

export const getDownCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings): Cell => ({
    columnKey: currentCell.columnKey,
    rowKeyValue: getNextRowKeyValue(getPageRowKeyValues(props), currentCell.rowKeyValue, 1, settings?.end),
});

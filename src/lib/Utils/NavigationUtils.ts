import { Cell } from '../Models/Cell';
import { Column } from '../Models/Column';
import { ITableProps } from '../Components/Table/Table';
import { getData } from './PropsUtils';
import { getGroupedAndVisibleColumns } from './GroupUtils';
import { getRowKeyValues } from './RowUtils';

export interface IMoveFocusedSettings {
    end?: boolean
}

/**
 * The next item: one item forward or back, or the last or the first item (end).
 * A missing item goes to the first one forward and stays back
 */
const getNextItem = <T>(items: T[], current: T, step: 1 | -1, end?: boolean): T => {
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

export const getNextRowKeyValue = (rowKeyValues: unknown[], rowKeyValue: unknown, step: 1 | -1, end?: boolean): unknown =>
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

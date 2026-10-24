import { groupMark, groupSummaryMark } from './GroupUtils';
import { treeDataMark, treeGroupMark } from './TreeUtils';

import { getValueByField } from './DataUtils';

// a row of the shown data: a row of the data, a tree row, a group row or a group summary row
interface ShownRow {
    groupMark?: unknown;
    groupSummaryMark?: unknown;
    rowData?: unknown;
    treeDataMark?: unknown;
    treeGroupMark?: unknown;
}

// the key of React of a row: a number stays a number, other values are strings, as React makes them
export const getReactKey = (rowKeyValue: unknown): React.Key | undefined => (
    rowKeyValue == null ? undefined : typeof rowKeyValue === 'number' ? rowKeyValue : String(rowKeyValue)
);

const hasCells = (row: ShownRow) => row.groupMark !== groupMark && row.groupSummaryMark !== groupSummaryMark;

/**
 * The key of a row with cells (a tree row is unwrapped), undefined for group rows and group summary rows
 */
export const getRowKeyValue = (row: unknown, rowKeyField: string): unknown => {
    const shownRow = row as ShownRow;
    return hasCells(shownRow)
        ? getValueByField(shownRow.treeGroupMark === treeGroupMark || shownRow.treeDataMark === treeDataMark ? shownRow.rowData : row, rowKeyField)
        : undefined;
};

/**
 * The keys of the rows which have cells: group rows and group summary rows are skipped
 */
export const getRowKeyValues = (data: unknown[], rowKeyField: string): unknown[] => (data as ShownRow[])
    .filter(hasCells)
    .map((row) => getRowKeyValue(row, rowKeyField));

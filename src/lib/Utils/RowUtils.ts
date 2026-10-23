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

const hasCells = (row: ShownRow) => row.groupMark !== groupMark && row.groupSummaryMark !== groupSummaryMark;

/**
 * The key of a row with cells (a tree row is unwrapped), undefined for group rows and group summary rows
 */
export const getRowKeyValue = (row: ShownRow, rowKeyField: string): unknown => (
    hasCells(row)
        ? getValueByField(row.treeGroupMark === treeGroupMark || row.treeDataMark === treeDataMark ? row.rowData : row, rowKeyField)
        : undefined
);

/**
 * The keys of the rows which have cells: group rows and group summary rows are skipped
 */
export const getRowKeyValues = (data: ShownRow[], rowKeyField: string): unknown[] => data
    .filter(hasCells)
    .map((row) => getRowKeyValue(row, rowKeyField));

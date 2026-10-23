
import { getValueByField } from './DataUtils';

export const treeGroupMark = {};
export const treeDataMark = {};

// a row of the tree: the row of the data and its level, treeGroupMark for a row with children, treeDataMark for a row without them
export interface ShownTreeRow<TData> {
    rowData: TData;
    treeDataMark?: typeof treeDataMark;
    treeDeep: number;
    treeGroupMark?: typeof treeGroupMark;
}

const isTreeGroupRow = (row: unknown): row is ShownTreeRow<unknown> => (row as Partial<ShownTreeRow<unknown>>).treeGroupMark === treeGroupMark;

export const getExpandedParents = (treeData: unknown[], rowKeyField: string): unknown[] =>
    treeData
        .filter(isTreeGroupRow)
        .map((item) => getValueByField(item.rowData, rowKeyField));

const getItemStructure = <TData>(
    item: TData,
    dataHash: Record<string, TData[]>,
    rowKeyField: string,
    treeDeep: number = 0): ShownTreeRow<TData>[] => {
    const children = dataHash[getValueByField(item, rowKeyField)];
    if (!children){
        return [{ treeDataMark, rowData: item, treeDeep: treeDeep + 1 }];
    }
    const result: ShownTreeRow<TData>[] = [{ treeGroupMark, rowData: item, treeDeep }];
    children.forEach((c) => {
        const childrenData = getItemStructure(c, dataHash, rowKeyField, treeDeep + 1);
        result.push(...childrenData);
    });
    return result;
};

export const getTreeGroupChain = <TData>(
    keyValue: unknown,
    dataMap: Record<string, TData>,
    treeGroupKeyField: string,
    treeGroupKeyValues: unknown[],
    groupChain: TData[] = []
): TData[] => {
    const value = dataMap[String(keyValue)];
    // the chain ends at a parent which is not in the data or is shown already: its own parents are shown too (this also ends a cycle)
    if (!value || treeGroupKeyValues.includes(keyValue)) {
        return groupChain;
    }
    treeGroupKeyValues.push(keyValue);
    const chain = [...groupChain, value];
    const treeGroupKeyValue = getValueByField(value, treeGroupKeyField);
    return treeGroupKeyValue == null ? chain : getTreeGroupChain(treeGroupKeyValue, dataMap, treeGroupKeyField, treeGroupKeyValues, chain);
};

export const restoreFilteredData = <TData>({
    data,
    originalData,
    rowKeyField,
    treeGroupKeyField,
}: {
    data: TData[],
    originalData: TData[],
    rowKeyField: string,
    treeGroupKeyField: string,
    treeGroupsExpanded?: unknown[]
}): TData[] => {
    const treeGroupKeyValues = data.map(d => getValueByField(d, rowKeyField));
    // without a prototype: the keys like 'constructor' don't find the members of Object
    const dataMap = originalData.reduce<Record<string, TData>>((acc, d) => {
        acc[getValueByField(d, rowKeyField)] = d;
        return acc;
    }, Object.create(null));
    const parents: TData[] = [];
    data.forEach(d => {
        const treeGroupKeyValue = getValueByField(d, treeGroupKeyField);
        if (treeGroupKeyValue != null && !treeGroupKeyValues.includes(treeGroupKeyValue)) {
            parents.push(...getTreeGroupChain(treeGroupKeyValue, dataMap, treeGroupKeyField, treeGroupKeyValues));
        }
    });
    if (!parents.length) {
        return data;
    }
    // in the order of the original data, not with the parents at the place of their first found child
    const originalIndexes = new Map<unknown, number>();
    originalData.forEach((d, index) => {
        const rowKeyValue = getValueByField(d, rowKeyField);
        if (!originalIndexes.has(rowKeyValue)) {
            originalIndexes.set(rowKeyValue, index);
        }
    });
    return [...data, ...parents]
        .map((row) => ({ row, index: originalIndexes.get(getValueByField(row, rowKeyField)) ?? originalData.length }))
        .sort((a, b) => a.index - b.index)
        .map(({ row }) => row);
}

const getDataHashAndRootElements = <TData>({
    data,
    rowKeyField,
    treeGroupKeyField,
    treeGroupsExpanded
}: {
    data: TData[],
    rowKeyField: string,
    treeGroupKeyField: string,
    treeGroupsExpanded?: unknown[]
}) => {
    // without a prototype: keys like 'constructor' don't find the members of Object (not a Map: the keys 1 and '1' are the same)
    const dataHash: Record<string, TData[]> = Object.create(null);
    const rowKeyValues = data.map((d) => getValueByField(d, rowKeyField));
    const hasRow: Record<string, boolean> = Object.create(null);
    rowKeyValues.forEach((rowKeyValue) => {
        hasRow[rowKeyValue] = true;
    });
    const expandedRowKeyValues = treeGroupsExpanded && new Set(treeGroupsExpanded);
    const rootElements: TData[] = [];
    data.forEach((d, index) => {
        const parentRowKeyValue = getValueByField(d, treeGroupKeyField);
        const isRoot = parentRowKeyValue == null
            // a row whose parent is not in the data (e.g. it is deleted) or is the row itself is a root instead of a lost row
            || !hasRow[parentRowKeyValue]
            || String(parentRowKeyValue) === String(rowKeyValues[index]);
        if (isRoot) {
            rootElements.push(d);
            return;
        }
        if (!dataHash[parentRowKeyValue]){
            dataHash[parentRowKeyValue] = [];
        }
        if (!expandedRowKeyValues || expandedRowKeyValues.has(parentRowKeyValue)) {
            dataHash[parentRowKeyValue].push(d);
        }
    });
    return { dataHash, rootElements };
};

export const getTreeData = <TData>({
    data,
    originalData,
    rowKeyField,
    treeGroupKeyField,
    treeGroupsExpanded
}: {
    data: TData[],
    originalData: TData[],
    rowKeyField: string,
    treeGroupKeyField: string,
    treeGroupsExpanded?: unknown[]
}): ShownTreeRow<TData>[] => {
    if (data.length !== originalData.length){
        data = restoreFilteredData({
            data,
            originalData,
            rowKeyField,
            treeGroupKeyField,
            treeGroupsExpanded
        });
    }
    const { dataHash, rootElements } = getDataHashAndRootElements({
        data,
        rowKeyField,
        treeGroupKeyField,
        treeGroupsExpanded
    });
    const newData: ShownTreeRow<TData>[] = [];
    rootElements.forEach(d => {
        newData.push(...getItemStructure(d, dataHash, rowKeyField));
    });
    return newData;
};


import { Column } from '../models';
import { FormatFunc } from '../types';
import { Group } from '../Models/Group';
import { GroupPanelSettings } from '../Models/GroupPanelSettings';
import { getValueByColumn, isFormattedValue } from './DataUtils';

export const groupMark = {};
export const groupSummaryMark = {};
export const groupDataMark = {};

/**
 * The groups which group the rows: a disabled group (enabled: false) keeps its settings, e.g. enableSummary,
 * until its column is grouped again
 */
export const getEnabledGroups = (groups?: Group[]): Group[] | undefined => {
    const enabledGroups = groups?.some((group) => group.enabled === false) ? groups.filter((group) => group.enabled !== false) : groups;
    return enabledGroups?.length ? enabledGroups : undefined;
};

// visible columns which are not grouped, and grouped columns
export const getGroupedAndVisibleColumns = (columns: Column[], groups?: Group[]) => {
    const enabledGroups = getEnabledGroups(groups);
    const isGrouped = (column: Column) => !!enabledGroups && enabledGroups.some((g) => g.columnKey === column.key);
    return {
        columns: columns.filter((c) => !isGrouped(c) && c.visible !== false),
        groupColumnsCount: enabledGroups ? enabledGroups.length : 0,
        groupedColumns: enabledGroups ? columns.filter(isGrouped) : [],
    };
};

// JSON.stringify gives the same "null" for null, undefined, NaN and Infinity, which are different groups
const groupKeyReplacer = (_key: string, value: unknown) => (
    value === undefined || (typeof value === 'number' && !Number.isFinite(value)) ? `--:+${value}--` : value
);

/**
 * The string of the key of a group (the values of the group and of its parent groups), e.g. for the React key of the group row
 */
export const getGroupKeyId = (groupKey: unknown[]): string => JSON.stringify(groupKey, groupKeyReplacer);

const getGroupSummary = (groupData: unknown[], key: unknown[], groupIndex: number) => ({ groupData, groupSummaryMark, key: getGroupKeyId([key, '--:+summary--']), groupIndex });

export const updateExpandedGroups = (groupsExpanded: any[][], groupKey: any[]): any[][] => {
    const groupKeyId = getGroupKeyId(groupKey);
    const newGroupsExpanded =
        groupsExpanded.filter((ge) => getGroupKeyId(ge) !== groupKeyId);
    if (newGroupsExpanded.length === groupsExpanded.length) {
        newGroupsExpanded.push(groupKey);
    }
    return newGroupsExpanded;
};

export const getExpandedGroups = (groupedData: any[]): any[][] => {
    return groupedData
        .filter((g) => g.groupMark === groupMark)
        .map((g) => g.key);
};

export const getGroupedData = (
    data: any[],
    groups: Group[],
    groupedColumns: Column[],
    groupsExpanded?: any[]): any[] => {
    const grouped = getGroupedStructure({
        data,
        groups: getEnabledGroups(groups) || [],
        groupedColumns,
        groupsExpanded
    });
    // without the groups or their columns the rows are not grouped
    return grouped ? convertToFlat(grouped) : data;
};

export const convertToFlat = (grouped: Map<any, any>, key: any[] = []) => {
    let result: any[] = [];
    grouped.forEach((value: any, groupValue: any) => {
        if (groupValue === groupSummaryMark){
            result.push(value);
        } else {
            const groupKey = [...key];
            groupKey.push(groupValue);
            result.push({ groupMark, key: groupKey, value: groupValue, groupItems: value?.groupDataMark === groupDataMark ? value?.groupData : value });
            result = [...result, ...(Array.isArray(value) ? value : convertToFlat(value, groupKey))];
        }
    });
    return result;
};

export const getGroupedStructure = ({
    data,
    groups,
    groupedColumns,
    expandedDeep = 0,
    groupsExpanded,
    parentGroupKey = []
}: {
    data: any[];
    groups: Group[];
    groupedColumns: Column[];
    expandedDeep?: number;
    groupsExpanded?: any[];
    parentGroupKey?: any[];
}
): Map<any, any> | void => {
    groups = [...groups];
    const group = groups.shift();
    if (group) {
        const column = groupedColumns && groupedColumns.find((g) => g.key === group.columnKey);
        if (column) {
            const grouped = groupBy(data, (item: any) => getValueByColumn(item, column));
            // the expanded groups by their values of this level: a Map finds them as the groups (NaN too) without searching the list for every group
            const groupsExpandedByValue = new Map<unknown, unknown[][]>();
            groupsExpanded?.forEach((ge) => {
                const items = groupsExpandedByValue.get(ge[expandedDeep]);
                items ? items.push(ge) : groupsExpandedByValue.set(ge[expandedDeep], [ge]);
            });
            grouped.forEach((groupData, key) => {
                const groupExpandedItems = groupsExpanded && (groupsExpandedByValue.get(key) || []);
                const isGroupExpanded = !groupExpandedItems
          || groupExpandedItems.some((ge) => ge.length === expandedDeep + 1);
                if (isGroupExpanded) {
                    const fullKey =  [...parentGroupKey, key];
                    const newStructure = getGroupedStructure({
                        data: groupData,
                        groups,
                        groupedColumns,
                        expandedDeep: expandedDeep + 1,
                        groupsExpanded: groupExpandedItems && groupExpandedItems.filter((ge) => ge.length > expandedDeep + 1),
                        parentGroupKey: fullKey
                    });

                    if (newStructure) {
                        if (group.enableSummary){
                            newStructure.set(groupSummaryMark, getGroupSummary(groupData, fullKey, expandedDeep));
                        }
                        (newStructure as any).groupDataMark = groupDataMark;
                        (newStructure as any).groupData = groupData;
                        grouped.set(key, newStructure);
                    } else if (group.enableSummary) {
                        // the summary row follows the rows of the group, but it is not one of its groupItems
                        grouped.set(key, Object.assign([...groupData, getGroupSummary(groupData, fullKey, expandedDeep)], { groupDataMark, groupData }));
                    }
                } else {
                    const emptyArray: any = [];
                    emptyArray.groupDataMark = groupDataMark;
                    emptyArray.groupData = groupData;
                    grouped.set(key, emptyArray);
                }
            });
            return grouped;
        }
    }
};

export const groupBy = (data: any[], keyGetter: any, isEmptyValue: boolean = false) => {
    const map = new Map();
    data.forEach((item) => {
        const key = normalizeKeyForMap(keyGetter(item));
        if (isEmptyValue) {
            map.set(key, []);
        } else {
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        }
    });
    return map;
};

export const normalizeKeyForMap = (key: any) => {
    return key instanceof Date
        ? key.toString()
        : key instanceof Object
            ? JSON.stringify(key)
            : key;
}

export const getGroupMark = () => groupMark;

export const getGroupText = (value: any, column: Column, format?: FormatFunc, groupItems?: any[]) => {
    const rowData = groupItems?.[0];
    const rowValue = rowData && column ? getValueByColumn(rowData, column) : undefined;
    // the value of the group is its key, where dates and objects are strings (see normalizeKeyForMap):
    // format gets the value of the rows of the group, as in their cells
    const formattedValue = format && format({ column, value: normalizeKeyForMap(rowValue) === value ? rowValue : value, rowData });
    return isFormattedValue(formattedValue) ? formattedValue : `${(column && column.title ? column.title + ': ' : '')}${value}`;
};

export const isMaxDeep = (groupPanel: GroupPanelSettings, columns: Column[], groups?: Group[]) => {
    const deep = groupPanel.deep || columns?.length - 1;
    const enabledGroups = getEnabledGroups(groups);
    return enabledGroups?.length && (enabledGroups.length >= deep);
}

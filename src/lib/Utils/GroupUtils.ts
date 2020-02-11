import { Column } from '../models';
import { Group } from '../Models/Group';
import { getValueByColumn } from './DataUtils';

const groupMark = {};
export const updateExpandedGroups = (groupsExpanded: any[][], groupKey: any[]): any[][] => {
  const newGroupsExpanded =
    groupsExpanded.filter((ge) => JSON.stringify(ge) !== JSON.stringify(groupKey));
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
  const grouped = getGroupedStructure(data, groups, groupedColumns, 0, groupsExpanded) as Map<any, any>;
  return convertToFlat(grouped);
};

export const convertToFlat = (grouped: Map<any, any>, key: any[] = []) => {
  let result: any[] = [];
  grouped.forEach((value: any, groupValue: any) => {
    const groupKey = [...key];
    groupKey.push(groupValue);
    result.push({ groupMark, key: groupKey, value: groupValue });
    result = [...result, ...(Array.isArray(value) ? value : convertToFlat(value, groupKey))];
  });
  return result;
};

export const getGroupedStructure = (
  data: any[],
  groups: Group[],
  groupedColumns: Column[],
  expandedDeep: number = 0,
  groupsExpanded?: any[],
): Map<any, any> | void => {
  groups = [...groups];
  const group = groups.shift();
  if (group) {
    const column = groupedColumns && groupedColumns.find((g) => g.key === group.columnKey);
    if (column) {
      const grouped = groupBy(data, (item: any) => getValueByColumn(item, column));
      grouped.forEach((value, key) => {
        const groupExpandedItems = groupsExpanded && groupsExpanded.filter((ge) => ge[expandedDeep] === key);
        const isThisGroupExpanded = !groupExpandedItems
          || groupExpandedItems.some((ge) => ge.length === expandedDeep + 1);
        if (isThisGroupExpanded) {
          const newStructure = getGroupedStructure(
            value,
            groups,
            groupedColumns,
            expandedDeep + 1,
            groupExpandedItems && groupExpandedItems.filter((ge) => ge.length > expandedDeep + 1),
          );
          if (newStructure) {
            grouped.set(key, newStructure);
          }
        } else {
          grouped.set(key, []);
        }
      });
      return grouped;
    }
  }
};

export const groupBy = (data: any[], keyGetter: any, isEmptyValue: boolean = false) => {
  const map = new Map();
  data.forEach((item) => {
    const key = keyGetter(item);
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

export const getGroupMark = () => groupMark;

export const getGroupText = (value: any, column?: Column) => {
  const format = column && column.format;
  return format ? format(value) : `${column && column.title && (column.title + ': ')}${value}`;
};

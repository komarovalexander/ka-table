import { Column } from '../models';
import { Group } from '../Models/Group';
import { GroupRowData } from '../Models/GroupRowData';
import { OptionChangeFunc } from '../types';
import { getField } from './ColumnUtils';

const groupMark = {};
export const groupClick = (groupsExpanded: any[][], groupRowData: GroupRowData, onOptionChange: OptionChangeFunc) => {
  const newGroupsExpanded =
    groupsExpanded.filter((ge) => JSON.stringify(ge) !== JSON.stringify(groupRowData.key));
  if (newGroupsExpanded.length === groupsExpanded.length) {
    newGroupsExpanded.push(groupRowData.key);
  }
  onOptionChange({ groupsExpanded: newGroupsExpanded });
};

export const getExpandedGroups = (groupedData: any[]): any[][] => {
  const groupsExpanded: any[][] = [];
  for (const value of groupedData) {
    if (value.groupMark === groupMark) {
      groupsExpanded.push(value.key);
    }
  }
  return groupsExpanded;
};

export const getGroupedData = (
  data: any[],
  groups: Group[],
  groupedColumns: Column[],
  groupsExpanded?: any[]): any[] => {
  const columnMap: any = {};
  groupedColumns.forEach((c) => columnMap[c.key] = getField(c));
  const grouped = getGroupedStructure(data, groups, columnMap, 0, groupsExpanded);
  return convertToFlat(grouped);
};

export const convertToFlat = (grouped: any, key: any[] = []) => {
  let result: any[] = [];
  grouped.forEach((value: any, groupValue: any) => {
    const groupKey = [...key];
    groupKey.push(groupValue);
    result.push({ groupMark, key: groupKey, value: groupValue });
    if (Array.isArray(value)) {
      value.forEach((item) => {
        result.push(item);
      });
    } else {
      result = result.concat(convertToFlat(value, groupKey));
    }
  });
  return result;
};

export const getGroupedStructure = (
  data: any[],
  groups: Group[],
  columnMap: any,
  expandedDeep: number = 0,
  groupsExpanded?: any[],
): any => {
  groups = [...groups];
  const group = groups.shift();
  if (group) {
    const grouped = groupBy(data, (item: any) => item[columnMap[group.columnKey]]);
    grouped.forEach((value, key) => {
      const groupExpandedItems = groupsExpanded && groupsExpanded.filter((ge) => ge[expandedDeep] === key);
      const isThisGroupExpanded = !groupExpandedItems
        || groupExpandedItems.some((ge) => ge.length === expandedDeep + 1);
      if (isThisGroupExpanded) {
        const newStructure = getGroupedStructure(
          value,
          groups,
          columnMap,
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

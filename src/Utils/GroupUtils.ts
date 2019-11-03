import { isArray } from 'util';

import groupMark from '../Constants/GroupMark';

export const getGroupedData = (data: any[], groups: string[], groupsExpanded?: any[]): any[] => {
  const grouped = getGroupedStructure(data, groups, 0, groupsExpanded);
  return convertToFlat(grouped);
};

export const convertToFlat = (grouped: any, key: any[] = []) => {
  let result: any[] = [];
  grouped.forEach((value: any, groupValue: any) => {
    const groupKey = [...key];
    groupKey.push(groupValue);
    result.push({ groupMark, key: groupKey, value: groupValue });
    if (isArray(value)) {
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
  groups: string[],
  expandedDeep: number = 0,
  groupsExpanded?: any[],
): any => {
  groups = [...groups];
  const group = groups.shift();
  if (group) {
    const grouped = groupBy(data, (item: any) => item[group]);
    grouped.forEach((value, key) => {
      const groupExpandedItems = groupsExpanded && groupsExpanded.filter((ge) => ge[expandedDeep] === key);
      const isThisGroupExpanded = !groupExpandedItems
        || groupExpandedItems.some((ge) => ge.length === expandedDeep + 1);
      if (isThisGroupExpanded) {
        const newStructure = getGroupedStructure(
          value,
          groups,
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

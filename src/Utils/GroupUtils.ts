import { isArray } from 'util';

import groupMark from '../Constants/GroupMark';
import { Group } from '../Models/Group';

export const getGroupedData = (data: any[], groups: Group[]): any[] => {
  const grouped = getGroupedStructure(data, [...groups]);
  return convertToFlat(grouped);
};

export const convertToFlat = (grouped: any, key: any[] = []) => {
  let result: any[] = [];
  grouped.forEach((value: any[], groupValue: any) => {
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

export const getGroupedStructure = (data: any[], groups: Group[]): any => {
  const group = groups.shift();
  if (group) {
    const grouped = groupBy(data, (item: any) => item[group.id]);
    if (groups.length > 0) {
      grouped.forEach((value, key) => {
        const newStructure = getGroupedStructure(value, [...groups]);
        if (newStructure) {
          grouped.set(key, newStructure);
        }
      });
    }
    return grouped;
  }
};

export const groupBy = (data: any[], keyGetter: any) => {
  const map = new Map();
  data.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
        map.set(key, [item]);
    } else {
        collection.push(item);
    }
  });
  return map;
};

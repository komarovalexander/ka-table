import { Column } from '../Models/Column';
import { Field } from '../types';
import { getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

export const getParentValue = (rowData: any, fieldParents: Field[], sameObj = false) => {
  const parentValue = fieldParents.reduce((previousValue, currentValue) => {
    const result = (previousValue && previousValue[currentValue]);
    return result !== undefined ? result : undefined;
  },
  rowData);
  return parentValue ? {...parentValue} : undefined;
};

export const createObjByFields = (fieldParents: Field[], field: Field, value: any) => {
  const parentValue: any = {};
  if (fieldParents.length) {
    fieldParents.reduce((previousValue, currentItem, currentIndex) => {
      const lastObj: any = {};
      previousValue[currentItem] = lastObj;
      if (currentIndex === (fieldParents.length - 1)) {
        lastObj[field] = value;
      }
      return lastObj;
    },
    parentValue);
  } else {
    parentValue[field] = value;
  }
  return {...parentValue};
};

export const getValueByColumn = (rowData: any, column: Column) => {
  return getValueByField(rowData, getField(column));
};

export const getValueByField = (rowData: any, field: Field) => {
  let o = {...rowData};
  const names = getFieldParts(field);
  for (let i = 0, n = names.length; i < n; ++i) {
      const k = names[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
};

const _replaceValueForField = (rowData: any, field: Field, newValue: any, fieldParents?: Field[]): void => {
  let result = {...rowData};
  if (fieldParents && fieldParents.length) {
    const parentValue = getParentValue(result, fieldParents) || {};
    parentValue[field] = newValue;

    const parentsOfParent = [...fieldParents];
    const parentFieldName = parentsOfParent.pop() as string;
    result = _replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
  } else {
    result[field] = newValue;
  }
  return result;
};

export const replaceValue = (rowData: any, column: Column, newValue: any) => {
  return replaceValueForField(rowData, getField(column), newValue);
};

export const replaceValueForField = (rowData: any, field: Field, newValue: any) => {
  return _replaceValueForField(rowData, getLastField(field), newValue, getLastFieldParents(field));
};

export const reorderData = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any) => {
  const moved = data.find(d => getKey(d) === keyValue);
  const newData = data.filter(d => getKey(d) !== keyValue);
  const targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
  newData.splice(targetIndex, 0, moved);
  return newData;
};

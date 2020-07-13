import { Column } from '../Models/Column';
import { Field } from '../types';
import { getField, getLastField, getLastFieldParents } from './ColumnUtils';

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
  let o = {...rowData};
  const names =  getField(column).split('.');
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

const replaceValueForField = (rowData: any, field: Field, newValue: any, fieldParents?: Field[]): void => {
  let result = {...rowData};
  if (fieldParents && fieldParents.length) {
    const parentValue = getParentValue(result, fieldParents) || {};
    parentValue[field] = newValue;

    const parentsOfParent = [...fieldParents];
    const parentFieldName = parentsOfParent.pop() as string;
    result = replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
  } else {
    result[field] = newValue;
  }
  return result;
};

export const replaceValue = (rowData: any, column: Column, newValue: any) => {
  return replaceValueForField(rowData, getLastField(column), newValue, getLastFieldParents(column));
};

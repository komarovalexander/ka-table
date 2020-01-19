import { Column } from '../Models/Column';
import { Field } from '../types';
import { getField } from './ColumnUtils';

export const getParentValue = (rowData: any, fieldParents: Field[], sameObj = false) => {
  const parentValue = fieldParents.reduce((previousValue, currentValue) => {
    const result = (previousValue && previousValue[currentValue]);
    return result !== undefined ? result : undefined;
  },
  rowData);
  return {...parentValue};
};

const createObjByFields = (fieldParents: Field[], field: Field, value: any) => {
  const parentValue: any = {};
  fieldParents.reduce((previousValue, currentItem, currentIndex) => {
    const lastObj: any = {};
    previousValue[currentItem] = lastObj;
    if (currentIndex === (fieldParents.length - 1)) {
      lastObj[field] = value;
    }
    return lastObj;
  },
  parentValue);
  return {...parentValue};
};

export const getValueByColumn = (rowData: any, column: Column) => {
  return getValueByField(rowData, getField(column), column.fieldParents);
};

export const getValueByField = (rowData: any, field: Field, fieldParents?: Field[]) => {
  if (fieldParents && fieldParents.length) {
    const parentValue = getParentValue(rowData, fieldParents);
    if (parentValue) {
      return parentValue[field];
    }
    return undefined;
  } else {
    return rowData[field];
  }
};

export const mergeValues = (rowData: any, field: Field, newValue: any, fieldParents?: Field[]) => {
  if (fieldParents && fieldParents.length) {
    let parentValue = getParentValue(rowData, fieldParents);
    if (parentValue) {
      parentValue[field] = newValue;
    } else {
      parentValue = createObjByFields(fieldParents, field, newValue);
    }
    const parentsOfParent = [...fieldParents];
    const parentFieldName = parentsOfParent.pop() as string;
    const result = { ...rowData};
    replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
    return result;
  } else {
    return { ...rowData, [field]: newValue };
  }
};

export const replaceValueForField = (rowData: any, field: Field, newValue: any, fieldParents?: Field[]): void => {
  if (fieldParents && fieldParents.length) {
    const parentValue = getParentValue(rowData, fieldParents);
    if (parentValue) {
      parentValue[field] = newValue;
      const parentsOfParent = [...fieldParents];
      const parentFieldName = parentsOfParent.pop() as string;
      replaceValueForField(rowData, parentFieldName, parentValue, parentsOfParent);
    }
  } else {
    rowData[field] = newValue;
  }
};

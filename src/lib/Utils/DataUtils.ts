import { Column } from '../Models/Column';
import { Field } from '../types';
import { getField } from './ColumnUtils';

export const getParentValue = (rowData: any, parentFields: Field[], sameObj = false) => {
  const parentValue = parentFields.reduce((previousValue, currentValue) => {
    const result = (previousValue && previousValue[currentValue]);
    return result !== undefined ? result : undefined;
  },
  rowData);
  return {...parentValue};
};

const createObjByFields = (parentFields: Field[], field: Field, value: any) => {
  const parentValue: any = {};
  parentFields.reduce((previousValue, currentItem, currentIndex) => {
    const lastObj: any = {};
    previousValue[currentItem] = lastObj;
    if (currentIndex === (parentFields.length - 1)) {
      lastObj[field] = value;
    }
    return lastObj;
  },
  parentValue);
  return {...parentValue};
};

export const getValueByColumn = (rowData: any, column: Column) => {
  return getValueByField(rowData, getField(column), column.parentFields);
};

export const getValueByField = (rowData: any, field: Field, parentFields?: Field[]) => {
  if (parentFields && parentFields.length) {
    const parentValue = getParentValue(rowData, parentFields);
    if (parentValue) {
      return parentValue[field];
    }
    return undefined;
  } else {
    return rowData[field];
  }
};

export const mergeValues = (rowData: any, field: Field, newValue: any, parentFields?: Field[]) => {
  if (parentFields && parentFields.length) {
    let parentValue = getParentValue(rowData, parentFields);
    if (parentValue) {
      parentValue[field] = newValue;
    } else {
      parentValue = createObjByFields(parentFields, field, newValue);
    }
    const parentsOfParent = [...parentFields];
    const parentFieldName = parentsOfParent.pop() as string;
    const result = { ...rowData};
    replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
    return result;
  } else {
    return { ...rowData, [field]: newValue };
  }
};

export const replaceValueForField = (rowData: any, field: Field, newValue: any, parentFields?: Field[]): void => {
  if (parentFields && parentFields.length) {
    const parentValue = getParentValue(rowData, parentFields);
    if (parentValue) {
      parentValue[field] = newValue;
      const parentsOfParent = [...parentFields];
      const parentFieldName = parentsOfParent.pop() as string;
      replaceValueForField(rowData, parentFieldName, parentValue, parentsOfParent);
    }
  } else {
    rowData[field] = newValue;
  }
};

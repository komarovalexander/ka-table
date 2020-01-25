import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { getField } from './ColumnUtils';
import { getValueByColumn, replaceValue } from './DataUtils';

export const convertToColumnTypes = (data: any[], columns: Column[]) => {
  const newData: any[] = data.map((d) => {
    let nd = {...d};
    columns.forEach((c) => {
      const field = getField(c);
      if (nd[field] != null) {
        switch (c.dataType) {
          case DataType.String: nd = replaceValue(nd, c, getValueByColumn(nd, c).toString()); break;
          case DataType.Number: nd = replaceValue(nd, c, Number(getValueByColumn(nd, c))); break;
          case DataType.Date: nd = replaceValue(nd, c, new Date(getValueByColumn(nd, c))); break;
          case DataType.Boolean: nd = replaceValue(nd, c, toBoolean(getValueByColumn(nd, c))); break;
        }
      }
    });
    return nd;
  });
  return newData;
};

export const getColumnsWithWrongType = (data: any[], columns: Column[]): Column[] => {
  if (!data.length) {
    return [];
  }
  const item = data[0];
  const columnsWithWrongType = columns.filter((c) => {
    const field = getField(c);
    const value = item[field];
    if (value != null) {
      switch (c.dataType) {
        case DataType.String: return value.constructor !== String;
        case DataType.Number: return value.constructor !== Number;
        case DataType.Date: return value.constructor !== Date;
        case DataType.Boolean: return value.constructor !== Boolean;
        case DataType.Object: return value.constructor !== Object;
      }
    }
    return true;
  });
  return columnsWithWrongType;
};

export const toBoolean = (value: any) => {
  if (typeof value === 'string') {
    switch (value.toLowerCase().trim()) {
      case 'true': case 'yes': case '1': return true;
      case 'false': case 'no': case '0': case null: return false;
    }
  }
  return Boolean(value);
};

export function isFunction(variableToCheck: any) {
  if (variableToCheck instanceof Function) {
      return true;
  }
  return false;
}

import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { getValueByColumn, replaceValue } from './DataUtils';

export const convertToColumnTypes = (data: any[], columns: Column[]) => {
  const newData: any[] = data.map((d) => {
    let nd = {...d};
    columns.forEach((c) => {
      const value = getValueByColumn(nd, c);
      if (value != null) {
        switch (c.dataType) {
          case DataType.String:
            if (value.constructor !== String) {
              nd = replaceValue(nd, c, value.toString());
            }
            break;
          case DataType.Number:
            if (value.constructor !== Number) {
              nd = replaceValue(nd, c, Number(value));
            }
            break;
          case DataType.Date:
            if (value.constructor !== Date) {
              nd = replaceValue(nd, c, new Date(value));
            }
            break;
          case DataType.Boolean:
            if (value.constructor !== Boolean) {
              nd = replaceValue(nd, c, toBoolean(value));
            }
            break;
        }
      }
    });
    return nd;
  });
  return newData;
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

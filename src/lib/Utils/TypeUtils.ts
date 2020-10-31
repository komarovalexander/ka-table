import defaultOptions from '../defaultOptions';
import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { getValueByColumn, replaceValue } from './DataUtils';

const dataTypeMap = {
  [String as any]: DataType.String,
  [Number as any]: DataType.Number,
  [Date as any]: DataType.Date,
  [Boolean as any]: DataType.Boolean,
  [Object as any]: DataType.Object,
} as any;

export const getColumnDataTypeByData = (column: Column, data: any[]) => {
  if (column.dataType){
    return column.dataType;
  }
  for (const item of data){
    const value = getValueByColumn(item, column);
    if (value != null) {
      return dataTypeMap[value.constructor] || defaultOptions.columnDataType;
    }
  }
  return defaultOptions.columnDataType;
};

export const convertToColumnTypes = (data: any[], columns: Column[]) => {
  const columnsToReplace = [...columns];
  const dataCopy = [...data];
  columnsToReplace.forEach((c) => {
    if (c.dataType){
      for (let i = 0; i < dataCopy.length; i++){
        const value = getValueByColumn(dataCopy[i], c);
        if (value != null) {
          switch (c.dataType) {
            case DataType.String:
              if (value.constructor !== String) {
                dataCopy[i] = replaceValue(dataCopy[i], c, value.toString());
                continue;
              }
              break;
            case DataType.Number:
              if (value.constructor !== Number) {
                dataCopy[i] = replaceValue(dataCopy[i], c, Number(value));
                continue;
              }
              break;
            case DataType.Date:
              if (value.constructor !== Date) {
                dataCopy[i] = replaceValue(dataCopy[i], c, new Date(value));
                continue;
              }
              break;
            case DataType.Boolean:
              if (value.constructor !== Boolean) {
                dataCopy[i] = replaceValue(dataCopy[i], c, toBoolean(value));
                continue;
              }
              break;
          }
          break;
        }
      }
    }
  });
  return dataCopy;
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

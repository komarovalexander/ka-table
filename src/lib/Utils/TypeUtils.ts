import { DataType } from '../enums';
import { Column } from '../Models/Column';
import { getField } from './ColumnUtils';

export const convertToColumnTypes = (data: any[], columns: Column[]) => {
  const newData: any[] = data.map((d) => {
    const nd = {...d};
    columns.forEach((c) => {
      const field = getField(c);
      if (nd[field] != null) {
        switch (c.dataType) {
          case DataType.String: nd[field] = nd[field].toString(); break;
          case DataType.Number: nd[field] = Number(nd[field]); break;
          case DataType.Date: nd[field] = new Date(nd[field]); break;
          case DataType.Boolean: nd[field] = toBoolean(nd[field]); break;
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

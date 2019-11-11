import { DataType } from '../enums';
import { Column } from '../Models/Column';

export const convertToColumnTypes = (data: any[], columns: Column[]) => {
  const newData: any[] = data.map((d) => {
    const nd = {...d};
    columns.forEach((c) => {
      if (nd[c.field] != null) {
        switch (c.dataType) {
          case DataType.String: nd[c.field] = nd[c.field].toString(); break;
          case DataType.Number: nd[c.field] = Number(nd[c.field]); break;
          case DataType.Date: nd[c.field] = new Date(nd[c.field]); break;
          case DataType.Boolean: nd[c.field] = toBoolean(nd[c.field]); break;
          case DataType.Object: nd[c.field] = nd[c.field]; break;
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

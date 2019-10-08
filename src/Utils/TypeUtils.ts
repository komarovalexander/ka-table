import { DataType } from '../Enums/DataType';
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
          case DataType.Boolean: nd[c.field] = Boolean(nd[c.field]); break;
          case DataType.Object: nd[c.field] = nd[c.field]; break;
        }
      }
    });
    return nd;
  });
  return newData;
};

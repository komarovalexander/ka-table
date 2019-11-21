import { Column } from '../models';
import { getField } from './ColumnUtils';

export const getRowValueByColumn = (rowData: any, column: Column) => {
  return rowData[getField(column)];
};

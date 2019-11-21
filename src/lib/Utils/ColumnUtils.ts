import { Column } from '../models';

export const compareColumns = (column1: Column, column2: Column) => {
  return column1.key === column2.key && column1.field === column2.field;
};

export const getField = (column: Column) => {
  return column.field || column.key;
};

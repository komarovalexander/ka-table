import { Column } from '../models';
import { Field } from '../types';

export const getField = (column: Column): Field => {
  return column.field || column.key;
};
